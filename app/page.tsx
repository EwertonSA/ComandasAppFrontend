

import "aos/dist/aos.css";




import HeaderIndex from "@/src/components/homeNoAuth/headerIndex";
import Footer from "@/src/components/common/footer";
import IndexDescription from "@/src/components/homeNoAuth/cards/static/indexDescription";
import IndexCertifications from "@/src/components/homeNoAuth/cards/static/indexCertifications";
import IndexProjects from "@/src/components/homeNoAuth/cards/static/indexProjects";



const Page = () => {
 

 


  return (
    
  <>   <HeaderIndex />    <IndexProjects />
      <IndexDescription />
      <IndexCertifications />  <Footer />
</>

    
  );
};

export default Page;
