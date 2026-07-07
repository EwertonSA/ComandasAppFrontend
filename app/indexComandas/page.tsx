

import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/src/components/homeNoAuth/presentationSection";
import CardSection from "@/src/components/homeNoAuth/cardSection";
import Footer from "@/src/components/common/footer";
import styles from "@/styles/getStyles.module.scss"

export default function HomeNoAuth() {
  return (

      <div
        className={styles.sectionBack}
        data-aos="fade-zoom-in"
        data-aos-duration="1600"
      >
        <HeaderNoAuth />
        <PresentationSection />
         <div data-aos="fade-right" data-aos-duration="1200">
        <CardSection />
      </div>
      <Footer />
      </div>

  );
}
