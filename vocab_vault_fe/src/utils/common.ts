import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

export const getTokenByLocalStorage = (): string | null => {
   return localStorage.getItem('access_token');
};

export const setTokenByLocalStorage = (value: string) => {
   localStorage.setItem('access_token', value);
}

// Function to manually refresh the token
export const refreshToken = async () => {
   try {
      // Create a direct axios instance that bypasses interceptors
      const response = await fetch(`${import.meta.env.VITE_URL_API}/api/auth/refresh-token`, {
         method: 'POST',
         credentials: 'include', // Include cookies
      });

      if (response.ok) {
         const data = await response.json();
         if (data && data.accessToken) {
            setTokenByLocalStorage(data.accessToken);
            return true;
         }
      }
      return false;
   } catch (error) {
      console.error("Error refreshing token manually:", error);
      return false;
   }
}

// Example: 2025-01-15T12:19:52.700228 => 1 giây trước, 1 phút trước, ...
export const convertAroundTime = (timestamp: string) => {
   const date = new Date(timestamp);
   return formatDistanceToNow(date, { addSuffix: true, locale: vi });
}

// Example: 2025-01-15T12:19:52.700228 => 15/01/2025
export const convertStringDate = (timestamp: string) => {
   const date = new Date(timestamp);
   return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
   });
};

export const convertToJSON = (input: string) => {

   const regex = /```json\s*(\{.*\})\s*```/s;
   const match = input.match(regex);
   if (match && match[1]) {
      try {
         return JSON.parse(match[1]);
      } catch (e) {
         console.log(e);
         return null;
      }
   }
}

export const capitalizeFirstLetter = (string: string = '') => {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

export const handlePlayAudio = async (audioData: Blob) => {
   if (audioData) {
      try {
         const audioUrl = URL.createObjectURL(audioData);
         const audio = new Audio(audioUrl);
         audio.play();
         audio.onended = () => {
            URL.revokeObjectURL(audioUrl);
         };
      } catch (error) {
         console.error('Error playing audio:', error);
      }
   }
};