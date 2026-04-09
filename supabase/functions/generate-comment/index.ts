import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { leadName, leadBio, leadNicho, leadKeywords, observations } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `Você é uma especialista em Social Selling e Instagram Marketing. 
Seu papel é gerar comentários estratégicos para engajar com leads no Instagram.
Os comentários devem ser:
- Naturais e autênticos (nunca parecer robô ou genérico)
- Relevantes ao conteúdo do lead
- Curtos (1-3 frases no máximo)
- Que gerem conexão e abertura para conversa
- Em português brasileiro informal mas profissional

Gere 3 sugestões diferentes: uma para comentar em post, uma para responder story, e uma para DM inicial.
Formate assim:
📝 **Comentário em Post:** [sugestão]
📱 **Resposta de Story:** [sugestão]  
💬 **DM Inicial:** [sugestão]`;

    const userPrompt = `Gere comentários estratégicos para este lead:

**Nome:** ${leadName}
**Nicho:** ${leadNicho}
**Bio:** ${leadBio || "Não disponível"}
**Palavras-chave dos posts:** ${leadKeywords || "Não disponível"}

**Observações registradas nos dias anteriores:**
${observations && observations.length > 0 ? observations.join("\n- ") : "Nenhuma observação registrada ainda."}

Com base nessas informações, gere comentários personalizados e estratégicos.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes. Adicione créditos em Settings > Workspace > Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "Não foi possível gerar comentários.";

    return new Response(JSON.stringify({ comment: content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-comment error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
