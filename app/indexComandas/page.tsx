

import HeaderNoAuth from "@/src/components/homeNoAuth/headerNoAuth";
import PresentationSection from "@/src/components/homeNoAuth/presentationSection";
import CardSection from "@/src/components/homeNoAuth/cardSection";
import Footer from "@/src/components/common/footer";
import styles from "@/styles/HomeNoAuth.module.scss";

export default function HomeNoAuth() {
  return (
    <main>
      <div
        className={styles.sectionBack}
        data-aos="fade-zoom-in"
        data-aos-duration="1600"
      >
        <HeaderNoAuth />
        <PresentationSection />
      </div>
      <div data-aos="fade-right" data-aos-duration="1200">
        <CardSection />
      </div>
      <Footer />
    </main>
  );
}
