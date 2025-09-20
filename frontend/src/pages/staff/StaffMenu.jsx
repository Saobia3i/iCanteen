// src/pages/staff/StaffMenu.jsx
import React, { useEffect, useState } from "react";
import {
  Box, Card, CardContent, CardHeader, TextField, Button, Grid, Switch,
  FormControlLabel, Stack, Typography, IconButton, Tooltip, InputAdornment
} from "@mui/material";
import { Add, Delete, Edit, Image } from "@mui/icons-material";
import api from "../../lib/api";
 
// local demo asset mapping (optional preview)
import burger from "../../assets/burger.jpg";
import fries from "../../assets/Fries.jpg";
import pizza from "../../assets/pizza.jpg";
import smoothie from "../../assets/smoothie.jpg";
const assetMap = { burger, fries, pizza, smoothie };

export default function StaffMenu() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // form state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageKey, setImageKey] = useState("");   // frontend asset map
  const [imageUrl, setImageUrl] = useState("");   // external/public url (optional)
  const [imageFile, setImageFile] = useState(null); // upload (optional)
  const [isAvailable, setIsAvailable] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // load menu
  const load = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/menu"); // public endpoint
      setItems(data || []);
    } catch (e) {
      console.error("LOAD_MENU_ERR", e?.response?.status, e?.response?.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setName(""); setPrice(""); setDescription("");
    setImageKey(""); setImageUrl(""); setImageFile(null);
    setIsAvailable(true);
  };

  // create
  const onCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (imageFile) {
        // multipart upload
        const fd = new FormData();
        fd.append("name", name);
        fd.append("price", price);
        fd.append("description", description);
        fd.append("is_available", isAvailable ? "1" : "0");
        if (imageKey) fd.append("image_key", imageKey);
        if (imageUrl) fd.append("image_url", imageUrl);
        fd.append("image_file", imageFile);

        await api.post("/menu", fd, { headers: { "Content-Type": "multipart/form-data" } });
      } else {
        // normal JSON
        await api.post("/menu", {
          name,
          price,
          description,
          is_available: isAvailable ? 1 : 0,   // ✅ numeric boolean
          image_key: imageKey || null,
          image_url: imageUrl || null
        });
      }
      resetForm();
      await load();
    } catch (e) {
      console.error("CREATE_MENU_ERR", e?.response?.status, e?.response?.data);
      alert(e?.response?.data?.message || "Failed to create menu item");
    } finally {
      setSubmitting(false);
    }
  };

  // toggle availability
  const toggleAvailability = async (id, current) => {
    try {
      await api.put(`/menu/${id}`, { is_available: current ? 0 : 1 });
      setItems(prev => prev.map(it => it.id === id ? { ...it, is_available: !current } : it));
    } catch (e) {
      console.error("TOGGLE_ERR", e?.response?.status, e?.response?.data);
      alert(e?.response?.data?.message || "Failed to toggle");
    }
  };

  // delete
  const remove = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;
    try {
      await api.delete(`/menu/${id}`);
      setItems(prev => prev.filter(it => it.id !== id));
    } catch (e) {
      console.error("DELETE_ERR", e?.response?.status, e?.response?.data);
      alert(e?.response?.data?.message || "Failed to delete");
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "1200px", mx: "auto" }}>
      {/* Create form */}
      <Card sx={{ mb: 3, border: "1px solid #ffd54f", backgroundColor: "rgba(255,255,255,0.9)" }}>
        <CardHeader title="Add Menu Item" />
        <CardContent>
          <Box component="form" onSubmit={onCreate}>
            <Grid container spacing={2}>
              <Grid  xs={12} md={4}>
                <TextField fullWidth label="Name" value={name} onChange={e=>setName(e.target.value)} required />
              </Grid>
              <Grid  xs={12} md={4}>
                <TextField
                  fullWidth label="Price" type="number" value={price} onChange={e=>setPrice(e.target.value)} required
                  InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                />
              </Grid>
              <Grid  xs={12} md={4}>
                <FormControlLabel
                  control={<Switch checked={isAvailable} onChange={(_,v)=>setIsAvailable(v)} />}
                  label={isAvailable ? "Available" : "Unavailable"}
                />
              </Grid>

              <Grid  xs={12}>
                <TextField
                  fullWidth label="Description"
                  value={description} onChange={e=>setDescription(e.target.value)} multiline minRows={2}
                />
              </Grid>

              {/* image options */}
              <Grid  xs={12} md={4}>
                <TextField fullWidth label="Image Key (assets)" placeholder="e.g. burger, fries"
                  value={imageKey} onChange={e=>setImageKey(e.target.value)} />
              </Grid>
              <Grid  xs={12} md={4}>
                <TextField fullWidth label="Image URL (optional)"
                  value={imageUrl} onChange={e=>setImageUrl(e.target.value)} />
              </Grid>
              <Grid  xs={12} md={4}>
                <Button component="label" startIcon={<Image />}>
                  Choose Image File
                  <input type="file" accept="image/*" hidden onChange={e=>setImageFile(e.target.files?.[0] || null)} />
                </Button>
                {imageFile && <Typography variant="caption" sx={{ ml: 1 }}>{imageFile.name}</Typography>}
              </Grid>

              <Grid  xs={12}>
                <Stack direction="row" spacing={2}>
                  <Button type="submit" variant="contained" startIcon={<Add />} disabled={submitting}
                    sx={{ backgroundColor: "#F59E0B", "&:hover": { backgroundColor: "#FBBF24" } }}>
                    {submitting ? "Adding..." : "Add Item"}
                  </Button>
                  <Button variant="outlined" onClick={resetForm}>Reset</Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Items list */}
      <Grid container spacing={2}>
        {loading && <Typography sx={{ px:2 }}>Loading menu…</Typography>}
        {!loading && items.length === 0 && (
          <Typography sx={{ px:2 }}>No items yet. Add your first item above.</Typography>
        )}

        {items.map(it => (
          <Grid  xs={12} md={6} lg={4} key={it.id}>
            <Card sx={{ border: "1px solid #ffeb3b", backgroundColor: "rgba(255,255,255,0.9)" }}>
              <CardHeader
                title={`${it.name} — $${Number(it.price).toFixed(2)}`}
                subheader={it.is_available ? "Available" : "Unavailable"}
                action={
                  <Stack direction="row" spacing={1}>
                    <Tooltip title={it.is_available ? "Mark Unavailable" : "Mark Available"}>
                      <IconButton onClick={()=>toggleAvailability(it.id, it.is_available)}><Edit /></IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton color="error" onClick={()=>remove(it.id)}><Delete /></IconButton>
                    </Tooltip>
                  </Stack>
                }
              />
              <CardContent>
                {it.description && <Typography sx={{ mb: 1 }}>{it.description}</Typography>}
                {/* Preview image */}
                {it.image_url ? (
                  <img
                    src={it.image_url}
                    alt={it.name}
                    style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8 }}
                  />
                ) : it.image_key && assetMap[it.image_key] ? (
                  <img
                    src={assetMap[it.image_key]}
                    alt={it.name}
                    style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 8 }}
                  />
                ) : (
                  <Typography variant="caption" color="text.secondary">No image</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
