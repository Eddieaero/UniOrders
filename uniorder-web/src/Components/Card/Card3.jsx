import uniList from "../../assets/university list.svg";
import uniList1 from "../../assets/university list1.svg";
import circles from "../../assets/boundaries.svg";
import {InstagramLogo, TiktokLogo, WhatsappLogo} from "phosphor-react";

const Card3 = () => {
    return (
        <div className="p-lg-5" style={{ backgroundColor: "#D0B754"}}> 
            <div className=" card3Content ">
                <div className="col-lg-6 col-sm-10 card3Uni"> 
                    <div className="m-lg-3 p-lg-3 m-sm-3 p-sm-3"  style={{textAlign: 'left'}}>
                        <div>
                            <img src={circles}/>
                            <p style={{fontSize:"32px", fontWeight:"normal"}}>Our reach is </p>
                            <p style={{fontSize:"32px", fontWeight:"normal", marginTop:"-15px"}}>Beyond Borders</p>
                            <p style={{fontSize:"16px", fontWeight:"normal", marginTop:"-15px"}}>Collaborating universities</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-sm-10 card3UniImage1">
                            <img  src={uniList1} />
                </div>
                <p className="card3UniImageDescr">and more...</p>
                <div className="col-lg-6 card3Social">
                    <div className="p-lg-3" >
                        <div className="m-lg-3" style={{borderRadius:"24px", backgroundColor:"black", color:"white", width:"500px", height:"250px"}}>
                            <div className="p-lg-4 m-lg-3" style={{textAlign:"left"}}>
                                <p style={{fontSize:"32px", fontWeight:"normal"}}>Share</p> 
                                <p style={{fontSize:"32px", fontWeight:"normal", marginTop:"-20px"}}>and</p>
                                <p style={{fontSize:"32px", fontWeight:"normal", marginTop:"-20px"}}>connect</p>
                                <p style={{fontSize:"14px", fontWeight:"normal", marginTop:"-10px"}}>Check us on social media</p>
                            </div>
                        </div>
                    </div>
                    <div className=" col-lg-6 "  style={{ display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "130px"}} >
                        <div >
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "15px", backgroundColor: "black", width: "50px", height: "50px" }}>
                                <InstagramLogo size={32} weight="bold" style={{color:"white" }} />
                            </div>
                        </div>
                        <div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "15px", backgroundColor: "black", width: "50px", height: "50px" }}>
                                <TiktokLogo size={32} weight="bold"  style={{color:"white" }}  />
                            </div> 
                        </div >
                        <div>
                            <div style={{display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "15px", backgroundColor: "black", width: "50px", height: "50px" }}>
                                <WhatsappLogo size={32} weight="bold"  style={{color:"white" }}  />
                            </div>
                        </div >
                    </div>
                </div>
            </div>
        </div>
    );  
}

export default Card3;


