

import "aos/dist/aos.css";


import IndexProjects from "@/src/component/render/cards/static/indexProjects";
import IndexDescription from "@/src/component/render/cards/static/indexDescription";
import IndexCertifications from "@/src/component/render/cards/static/indexCertifications";
import HeaderIndex from "@/src/components/homeNoAuth/headerIndex";
import Footer from "@/src/components/common/footer";



const Page = () => {
 

 


  return (
    
  <>   <HeaderIndex />    <IndexProjects />
      <IndexDescription />
      <IndexCertifications />  <Footer />
</>

    
  );
};

export default Page;
