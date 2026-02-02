import React, { useContext, useState, useEffect } from "react";
import { TextField, Button, Paper, Avatar } from "@mui/material";
import api from "../../utils/api";
import SideMenu from "./SideMenu.jsx";
import { toast } from "react-toastify";
import { AppContext } from "../context/Appcontext.jsx";
import { FiEdit2, FiUser, FiPhone, FiMail, FiCheckCircle, FiCamera, FiX } from "react-icons/fi";

function Myprofile() {
  const { profile, setProfile } = useContext(AppContext);
  const [editing, setEditing] = useState(false);
  const [localProfile, setLocalProfile] = useState(profile || {});

  useEffect(() => {
    if (profile) setLocalProfile(profile);
  }, [profile]);

  const handleChange = (e) => {
    setLocalProfile({ ...localProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/user/updateprofile", localProfile);
      if (data.message) {
        toast.success(data.message);
        setEditing(false);
        setProfile(localProfile);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Error saving profile");
    }
  };

  const getInitials = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <SideMenu />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4 space-y-8">
            <Paper elevation={0} className="!rounded-[2.5rem] border border-stone-100 bg-white shadow-sm overflow-hidden">
              <div className="p-6 sm:p-10 md:p-14">

                {/* Profile Header Block */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-stone-50 mb-10">
                  <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                    <div className="relative">
                      <Avatar
                        sx={{
                          width: { xs: 80, sm: 110 },
                          height: { xs: 80, sm: 110 },
                          bgcolor: "#1A3A32",
                          fontSize: "2.2rem",
                          fontWeight: 'bold',
                          border: "5px solid #FDFBF7",
                          boxShadow: '0 15px 35px rgba(26,58,50,0.12)'
                        }}
                      >
                        {getInitials(profile?.name)}
                      </Avatar>
                      {editing && (
                        <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center cursor-pointer hover:bg-black/50 transition-all">
                          <FiCamera className="text-white text-2xl" />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-1">
                      <h1 className="text-3xl md:text-5xl font-serif text-[#1A3A32] leading-tight">
                        {profile?.name || "Patron Profile"}
                      </h1>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                         <span className="w-2 h-2 rounded-full bg-[#C5A059]"></span>
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C5A059]">
                            Heritage Member Since 2026
                         </p>
                      </div>
                    </div>
                  </div>

                  {!editing ? (
                    <button
                      onClick={() => setEditing(true)}
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-[#1A3A32] text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-[#C5A059] transition-all shadow-xl shadow-green-900/10"
                    >
                      <FiEdit2 /> Edit Profile
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditing(false)}
                      className="flex items-center justify-center gap-3 px-8 py-4 bg-stone-100 text-stone-600 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all"
                    >
                      <FiX /> Discard Changes
                    </button>
                  )}
                </div>

                {/* Info / Form Area */}
                {!editing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ProfileInfoItem icon={<FiUser />} label="Full Name" value={profile?.name} />
                    <ProfileInfoItem icon={<FiPhone />} label="Phone Identity" value={profile?.phone} />
                    <ProfileInfoItem icon={<FiMail />} label="Email Address" value={profile?.email} />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Full Legal Name</label>
                        <TextField fullWidth name="name" value={localProfile?.name || ""} onChange={handleChange} required sx={formStyles} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Contact Number</label>
                        <TextField fullWidth name="phone" value={localProfile?.phone || ""} onChange={handleChange} required sx={formStyles} />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Primary Email</label>
                        <TextField fullWidth name="email" value={localProfile?.email || ""} onChange={handleChange} required sx={formStyles} />
                      </div>
                    </div>

                    <div className="pt-6">
                      <Button 
                        type="submit" 
                        variant="contained" 
                        className="!bg-[#1A3A32] !rounded-full !px-12 !py-4 !text-[11px] !font-black !tracking-widest !shadow-2xl shadow-green-900/20"
                      >
                        Update My Identity
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </Paper>

            {/* Trust Footer */}
            <div className="bg-[#1A3A32] rounded-[2rem] p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-green-900/20">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C5A059]">
                   <FiCheckCircle size={32} />
                </div>
                <div>
                   <h3 className="font-serif text-xl font-bold italic">Secure Heritage Account</h3>
                   <p className="text-white/50 text-sm max-w-sm mt-1">Your data is stored with ethical encryption, prioritizing your privacy above all else.</p>
                </div>
              </div>
              <div className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em] hidden xl:block">
                Member Protected
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProfileInfoItem = ({ icon, label, value }) => (
  <div className="p-6 rounded-3xl border border-stone-50 bg-[#FDFBF7] group hover:border-[#C5A059]/30 transition-all duration-500">
    <div className="flex items-center gap-3 mb-4">
      <div className="text-[#C5A059] group-hover:scale-110 transition-transform duration-500">
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest">{label}</span>
    </div>
    <p className="font-bold text-[#1A3A32] text-sm truncate">{value || "Not provided"}</p>
  </div>
);

const formStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '16px',
    backgroundColor: '#FDFBF7',
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: '#C5A059' },
    '&.Mui-focused fieldset': { borderColor: '#1A3A32' },
  }
};

export default Myprofile;