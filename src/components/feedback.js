import React, { useState, useEffect, useParams } from 'react';
import { Star } from 'grommet-icons';

function FeedBack(props) {
    // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
    const name = "uday";
    const [count, setCount] = useState(0);
    const [fid, setFid] = useState('');
    const [hoverIndex,setHoverIndex]=useState(0);
    const [selectedIndex,setSelectedIndex]=useState(0);

    useEffect(() => {
        let uid = props.match.params.feedbackid;
        setFid(getFeedBackDetails(uid));
    });

    const getFeedBackDetails = (id) => {
        return id;
    }

    return (
        <div className="page-content container">
            {fid}


            <div className="d-flex flex-column mx-auto" style={{ maxWidth: '400px', boxShadow:'0 5px 15px #dcdada, 0 2px 3px #dcdada', borderRadius:'10px', padding:'20px' }}>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="Email" />
                    <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label>Comments</label>
                    <textarea className="form-control" id="comments" aria-describedby="Comments" />
                </div>

                <div className="form-group">
                    <label>Rate Us</label>
                    <div className="text-center">
                    {
                         [... Array(5)].map((res,i)=>{
                             return(
                            <Star size={'large'} key={i+1} onMouseEnter={()=>setHoverIndex(i+1)} onMouseLeave={()=>setHoverIndex(0)} color={hoverIndex >= i+1 ? 'brand':'silver'}/>
                             )
                         })
                     }
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mt-3">Submit</button>
            </div>

        </div>
    );
}
export default FeedBack;