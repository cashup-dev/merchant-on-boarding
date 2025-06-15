// Buat file terpisah src/lib/auth.ts
export const getToken = async () => {
    // Coba dari berbagai sumber
    if (typeof window === "undefined") return null;
    
    // 1. Cek cookies
    const cookieToken = document.cookie
      .split("; ")
      .find(row => row.startsWith("token="))
      ?.split("=")[1];
  
    // 2. Cek localStorage
    const lsToken = localStorage.getItem("token");
  
    // 3. Cek sessionStorage
    const ssToken = sessionStorage.getItem("token");
  
    const token = cookieToken || lsToken || ssToken;
  
    // Verifikasi token minimal length
    return token && token.length > 30 ? token : null;
  };