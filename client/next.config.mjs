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
                
                port:'',
              //   pathname:'https://api.themoviedb.org/'
            },

        ]
    },
};

export default nextConfig;
