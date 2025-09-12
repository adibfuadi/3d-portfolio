import { socialImgs } from "../constants";

const Footer = () => {
    const handleUrl = (url) => {
        // console.log(url)
        window.open(`${url}`, '_blank'); // Ganti URL dengan link yang Anda inginkan
    }
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p>Terms & Conditions</p>
        </div>
        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            <div key={index} className="icon" onClick={() => handleUrl(socialImg.url)}>
              <img src={socialImg.imgPath} alt="social icon"/>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Adib. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;