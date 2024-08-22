import clothing from "../../assets/clothing material_10 1.svg";
import black from "../../assets/blackrec.svg"
import blue from "../../assets/bluerec.svg"
import golden from "../../assets/goldenrec.svg"
import white from "../../assets/whiterec.svg"
import maroon from "../../assets/maroonrec.svg"

const Card2 = () => {
    return(
        <div className="p-lg-5 card2Content">
            <div className="p-lg-3">
                <p style={{fontSize:"36px", fontWeight:"normal"}}> See what we have</p>
                <p style={{fontSize:"20px", fontWeight:"normal", marginTop:"-20px"}}>Just for you</p>
            </div>
            <div className="p-lg-5 m-lg-2 p-sm-5 m-sm-5 card2Container">
                <div className="col-lg-6 col-sm-6 card2Cloth " style={{textAlign: 'left'}}>
                    <p style={{fontSize:"28px", fontWeight:"normal"}}>Best</p>
                    <p style={{fontSize:"28px", fontWeight:"normal", marginTop:"-25px"}}>Stitched Cloth</p>
                    <p style={{fontSize:"16px", fontWeight:"normal", marginTop:"-20px"}}>Memorable fine texture</p>
                    <div className="col-lg-7 p-lg-2 flex" style={{ borderRadius:"24px", backgroundColor: "#F2F2F2"}}>
                        <img src={clothing} style={{marginTop: "0px", width:"100%", height:"100%", objectFit:"cover"}}/>
                        <p className="justify-content m-lg-1 clothGrade" style={{fontSize:"14px", fontWeight:"normal", textAlign: "right" }}>High Grade</p>
                    </div>
                </div>
                <div className="col-lg-6 col-sm-6 card2Color" style={{textAlign: 'right'}}>
                    <div className="flex m-lg-3">
                        <div className="m-lg-2">
                            <div className="m-lg-1">
                                <img src={black} style={{marginTop: "0px", width:"20%", height:"20%", objectFit:"cover"}}/>
                                <img src={golden} style={{marginTop: "0px", width:"20%", height:"20%", objectFit:"cover"}}/>
                                <img src={blue} style={{marginTop: "0px", width:"20%", height:"20%", objectFit:"cover"}}/>
                            </div>
                            <div className="m-lg-1">
                                <img src={maroon} style={{marginTop: "0px", width:"20%", height:"20%", objectFit:"cover"}}/>
                                <img src={white} style={{marginTop: "0px", width:"20%", height:"20%", objectFit:"cover"}}/>
                            </div>
                        </div>
                        <div className=" ">
                            <p style={{fontSize:"28px", fontWeight:"normal"}}>With </p>
                            <p style={{fontSize:"28px", fontWeight:"normal", marginTop:"-25px"}}>Classic Colors</p>
                            <p style={{fontSize:"16px", fontWeight:"normal", marginTop:"-20px"}}>A sense of luxury, matches every Attire</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Card2