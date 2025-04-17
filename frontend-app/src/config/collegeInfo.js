export const collegeInfo = {
    name: import.meta.env.VITE_COLLEGE_NAME ,
    contact: {
        phone: import.meta.env.VITE_COLLEGE_PHONE ,
        email: import.meta.env.VITE_COLLEGE_EMAIL ,
        address: import.meta.env.VITE_COLLEGE_ADDRESS ,
        mapUrl: import.meta.env.VITE_GOOGLE_MAPS_URL
    },
    socialMedia: {
        facebook: import.meta.env.VITE_COLLEGE_FACEBOOK ,
        twitter: import.meta.env.VITE_COLLEGE_TWITTER ,
        instagram: import.meta.env.VITE_COLLEGE_INSTAGRAM ,
        linkedin: import.meta.env.VITE_COLLEGE_LINKEDIN 
    }
};

export default collegeInfo; 