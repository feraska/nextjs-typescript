/** @type {import('next').NextConfig} */
const nextConfig = {
  
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:'image.tmdb.org',
                pathname:'/t/p/w500/**',
                port:''
             //   pathname:'https://image.tmdb.org/',
               
            },
            {
                protocol:"https",
                hostname:'res.cloudinary.com',
                pathname:'/dpel2vfvq/image/upload/v1710696637/fiverr/oezstpr0zovkzvju7zcg.jpg',
                port:'',
              //   pathname:'https://api.themoviedb.org/'
            }
        ]
    },
};

export default nextConfig;
