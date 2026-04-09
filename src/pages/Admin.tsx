import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Users, Shield } from "lucide-react";
import logoLegatto from "@/assets/logo-legatto.png";

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  instagram: string | null;
  phone: string | null;
  email: string | null;
  created_at: string;
}

const Admin = () => {
  const { isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/");
    }
  }, [authLoading, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchProfiles();
    }
  }, [isAdmin]);

  const fetchProfiles = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    setProfiles(data || []);
    setLoading(false);
  };

  if (authLoading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <img src={logoLegatto} alt="Legatto" className="h-10 w-auto" />
          <div className="h-5 w-px bg-border" />
          <Shield className="w-4 h-4 text-primary" />
          <p className="text-sm font-semibold text-foreground font-body">Painel Admin</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-5 h-5 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Usuários Cadastrados</h1>
          <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded-full font-body">
            {profiles.length}
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : profiles.length === 0 ? (
          <p className="text-muted-foreground text-center py-12 font-body">Nenhum usuário cadastrado ainda.</p>
        ) : (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-body">Nome</TableHead>
                  <TableHead className="font-body">E-mail</TableHead>
                  <TableHead className="font-body">Instagram</TableHead>
                  <TableHead className="font-body">Telefone</TableHead>
                  <TableHead className="font-body">Cadastro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-body font-medium">{p.full_name || "—"}</TableCell>
                    <TableCell className="font-body">{p.email || "—"}</TableCell>
                    <TableCell className="font-body">{p.instagram ? `@${p.instagram}` : "—"}</TableCell>
                    <TableCell className="font-body">{p.phone || "—"}</TableCell>
                    <TableCell className="font-body text-muted-foreground text-xs">
                      {new Date(p.created_at).toLocaleDateString("pt-BR")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
