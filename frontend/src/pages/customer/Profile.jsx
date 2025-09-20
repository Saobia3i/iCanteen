import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  Snackbar,
  IconButton,
  CircularProgress,
  Tooltip,
  Chip,
} from "@mui/material";
import { Visibility, VisibilityOff, Save, Edit, Refresh, Email, BadgeOutlined } from "@mui/icons-material";
import api from "../../lib/api";
import bg from "../../assets/foodiebg.jpg"; 
import BackButton from "../../components/BackButton"; // <-- your background
// brand colors come from CSS vars you set earlier: --brand, --brand-600, --btn-fg

export default function Profile() {
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [okOpen, setOkOpen] = useState(false);

  // fetch me
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    api
      .get("/me")
      .then((res) => {
        if (!mounted) return;
        setMe(res.data);
        setName(res.data?.name || "");
      })
      .catch((e) => {
        const msg = e?.response?.data?.message || e?.message || "Failed to load profile";
        setErr(msg);
      })
      .finally(() => setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const initials = useMemo(() => {
    const n = (me?.name || me?.email || "U").trim();
    const parts = n.split(" ").filter(Boolean);
    return (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
  }, [me]);

  const hasChanges = useMemo(() => {
    return (name && name !== me?.name) || password.length > 0;
  }, [name, password, me]);

  const handleReset = () => {
    setName(me?.name || "");
    setPassword("");
    setErr("");
  };

  const save = async (e) => {
    e?.preventDefault?.();
    if (!hasChanges) return;
    setErr("");
    setSaving(true);
    try {
      const { data } = await api.put("/me", {
        ...(name && name !== me?.name ? { name } : {}),
        ...(password ? { password } : {}),
      });
      setMe(data);
      setPassword("");
      localStorage.setItem("user", JSON.stringify(data));
      setOkOpen(true);
    } catch (e) {
      const msg = e?.response?.data?.message || e?.message || "Update failed";
      setErr(msg);
    } finally {
      setSaving(false);
    }
  };

  // ---------- UI ----------
  if (loading) {
    return (
      <Box sx={{ position: "relative", minHeight: "100vh" }}>
        {/* Background layer */}
        <BgLayer />

        <Container maxWidth="md" sx={{ py: 6, position: "relative", zIndex: 1 }}>
          
          <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
            <Box sx={{ height: 4, bgcolor: "divider", position: "relative" }}>
              {/* Back button */}
      
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "35%",
                  bgcolor: "text.secondary",
                  opacity: 0.2,
                  animation: "shine 1.2s infinite",
                  "@keyframes shine": {
                    "0%": { left: "-35%" },
                    "100%": { left: "100%" },
                  },
                }}
              />
            </Box>
            <CardContent sx={{ p: 4 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                    <Box sx={{ width: 96, height: 96, borderRadius: "50%", bgcolor: "action.hover" }} />
                    <Box sx={{ width: 160, height: 20, bgcolor: "action.hover", borderRadius: 1 }} />
                    <Box sx={{ width: 120, height: 16, bgcolor: "action.hover", borderRadius: 1 }} />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Box sx={{ display: "grid", gap: 2 }}>
                    <Box sx={{ width: "100%", height: 56, bgcolor: "action.hover", borderRadius: 2 }} />
                    <Box sx={{ width: "100%", height: 56, bgcolor: "action.hover", borderRadius: 2 }} />
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Box sx={{ flex: 1, height: 40, bgcolor: "action.hover", borderRadius: 2 }} />
                      <Box sx={{ flex: 1, height: 40, bgcolor: "action.hover", borderRadius: 2 }} />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    );
  }

  if (err && !me) {
    return (
      <Box sx={{ position: "relative", minHeight: "100vh" }}>
        <BgLayer />
        <Container maxWidth="sm" sx={{ py: 6, position: "relative", zIndex: 1 }}>
          
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {err}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", minHeight: "100vh" }}>
      {/* Blurred image background */}
      <BgLayer />

      {/* Foreground content */}
      <Container maxWidth="md" sx={{ py: 6, position: "relative", zIndex: 1 }}>
                <div className="absolute top-4 left-4 z-20">
                <BackButton />
              </div>
        <Card
          sx={{
            borderRadius: 3,
            mb: 3,
            overflow: "hidden",
            /* subtle translucency to sit nicely over bg */
            backgroundColor: "rgba(255,255,255,0.8)",
            backdropFilter: "saturate(140%) blur(2px)",
            /* dark theme adjustment via data-theme */
            "@media (prefers-reduced-transparency: reduce)": { backgroundColor: "background.paper" },
            ...(document.documentElement.getAttribute("data-theme") === "dark"
              ? {
                  backgroundColor: "rgba(17,24,39,0.72)", // dark translucent
                }
              : {}),
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  fontSize: 24,
                  bgcolor: "var(--brand)",
                  color: "var(--btn-fg)",
                }}
                alt={me?.name}
              >
                {initials.toUpperCase()}
              </Avatar>
            }
            title={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h5" fontWeight={800}>
                  My Account
                </Typography>
                {me?.role && (
                  <Chip
                    size="small"
                    variant="outlined"
                    color="default"
                    icon={<BadgeOutlined fontSize="small" />}
                    label={me.role}
                    sx={{ ml: 1 }}
                  />
                )}
              </Box>
            }
            subheader={me?.email}
            action={
              <Tooltip title="Reload profile">
                <IconButton
                  onClick={() => {
                    setLoading(true);
                    setErr("");
                    api
                      .get("/me")
                      .then((res) => {
                        setMe(res.data);
                        setName(res.data?.name || "");
                      })
                      .catch((e) => {
                        const msg =
                          e?.response?.data?.message || e?.message || "Failed to reload profile";
                        setErr(msg);
                      })
                      .finally(() => setLoading(false));
                  }}
                >
                  <Refresh />
                </IconButton>
              </Tooltip>
            }
            sx={{ p: 3 }}
          />
          <Divider />
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            {err && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {err}
              </Alert>
            )}

            <Grid container spacing={3}>
              {/* Profile summary */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 2.5,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    display: "grid",
                    gap: 1,
                    backgroundColor: "background.paper",
                    opacity: 0.95,
                  }}
                >
                  <Typography variant="subtitle2" color="text.secondary">
                    Account
                  </Typography>
                  <Typography variant="h6" fontWeight={700}>
                    {me?.name}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                    <Email fontSize="small" />
                    <Typography variant="body2">{me?.email}</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Role: {me?.role || "—"}
                  </Typography>

                  <Divider sx={{ my: 1.5 }} />
                  <Typography variant="body2" color="text.secondary">
                    Update your display name or change your password from the form.
                  </Typography>
                </Box>
              </Grid>

              {/* Form */}
              <Grid item xs={12} md={8}>
                <Box component="form" onSubmit={save} sx={{ display: "grid", gap: 2 }}>
                  <TextField
                    label="Display Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <Box component="span" sx={{ mr: 1, display: "inline-flex", alignItems: "center" }}>
                          <Edit fontSize="small" />
                        </Box>
                      ),
                    }}
                  />

                  <Box sx={{ display: "grid", gap: 1 }}>
                    <TextField
                      label="New Password"
                      type={showPwd ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Leave blank to keep same"
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <IconButton onClick={() => setShowPwd((s) => !s)} edge="end" aria-label="toggle password">
                            {showPwd ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        ),
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      Use at least 8 characters, including a number & a symbol.
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", gap: 1.5, mt: 1, flexWrap: "wrap" }}>
                    <Button
                      type="submit"
                      disabled={!hasChanges || saving}
                      startIcon={!saving && <Save />}
                      sx={{
                        px: 3,
                        py: 1,
                        borderRadius: 2,
                        fontWeight: 800,
                        backgroundColor: "var(--brand)",
                        color: "var(--btn-fg)",
                        "&:hover": { backgroundColor: "var(--brand-600)" },
                      }}
                    >
                      {saving ? <CircularProgress size={20} /> : "Save changes"}
                    </Button>

                    <Button
                      type="button"
                      variant="outlined"
                      disabled={saving || (!hasChanges && !err)}
                      onClick={handleReset}
                      sx={{ px: 2.5, py: 1, borderRadius: 2 }}
                    >
                      Reset
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Success toast */}
        <Snackbar
          open={okOpen}
          autoHideDuration={2500}
          onClose={() => setOkOpen(false)}
          message="Profile updated"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Container>
    </Box>
  );
}

/** Full-screen blurred background image layer */
function BgLayer() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px)",
          transform: "scale(1.08)", // prevent edge clipping after blur
        },
        // a subtle dark/Light overlay to increase contrast with text
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            document.documentElement.getAttribute("data-theme") === "dark"
              ? "rgba(0,0,0,0.45)"
              : "rgba(255,255,255,0.25)",
        },
      }}
    />
  );
}
