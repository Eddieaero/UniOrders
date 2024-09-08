import whitelogo from "../../assets/logo white.svg";
import {WhatsappLogo,TiktokLogo, InstagramLogo} from "phosphor-react";

const Footer = () => {
 return (
    <div className="" style={{backgroundColor:"black"}} >
      <div>
         <div className="p-lg-3 footerContent" style={{justifyContent:"center"}}>
            <div className="col-lg-4 col-sm-12 p-lg-4 footerimg"><img src={whitelogo} style={{ width:"40%", height:"auto", objectFit:"cover"}}/></div>
            <div className="col-lg-8 col-sm-12 contactInfo" >
               <div className="col-lg-3 col-sm-10 p-lg-4 ">
                  <p>For more information</p>
                  <a href="tel:+255784346484" style={{ color: "#bdbcbc", textDecoration: "none" }}>
                     +255 784 346 484
                  </a>
               </div>
               <div className="col-lg-3 col-sm-10 my-1 p-lg-4 flex" style={{ marginBottom: "0px", display:"flex", flexDirection:"column" }}>
                  <div>
                     <a  href="https://www.instagram.com/university_graduations" target="_blank" rel="noopener noreferrer" style={{justifyContent:"right", textDecoration:"none",  margin: "0 0px", color: "#bdbcbc" }}>
                     <InstagramLogo size={32} /> Instagram
                     </a>
                  </div>
                  <div>
                     <a href="https://wa.me/255784346484" target="_blank" rel="noopener noreferrer" style={{justifyContent:"right", textDecoration:"none", margin: "0 0px", color: "#bdbcbc" }}>
                     <WhatsappLogo size={32} /> WhatsApp
                     </a>
                  </div>
                  <div>
                     <a href="https://www.tiktok.com/@university_graduations" target="_blank" rel="noopener noreferrer" style={{ justifyContent:"right", textDecoration:"none", margin: "0 0px", color: "#bdbcbc" }}>
                     <TiktokLogo size={32} className="" /> TikTok
                     </a>
                  </div>
               </div>
               <div  className="col-lg-6 col-sm-10 p-lg-4 " >
                  <p>Terms and conditions</p>
                  <p>Any order not paid for will not be delivered
                     For any order inquiries please contact the 
                     support team as soon as possible 
                  </p>
               </div>
            </div>
         </div>
         <div >
            <p className="footerline" style={{color:"white"}}>University Graduations @2024</p> 
         </div>
      </div>
    </div>
     );
}
export default Footer;
