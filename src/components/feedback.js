import React, { useState, useEffect, useParams } from "react";
import { Star, BottomCorner } from "grommet-icons";
import { ToastProvider, useToasts } from 'react-toast-notifications'



function FeedBack(props, { content }) {
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
  //const { addToast } = useToasts()

  useEffect(() => {
    let uid = props.match.params.feedbackid;
    document.title = "THEM | Feedback";
    setFid(getFeedBackDetails(uid));
  });

  const getFeedBackDetails = (id) => {
    return id;
  };
  const [fid, setFid] = useState("");



  const FormWithToasts = () => {
    const { addToast } = useToasts()

    const [hoverIndex, setHoverIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSubmit = async value => {
      //const { error } = await dataPersistenceLayer(value)
      const error = false
      if (error) {
        addToast(error.message, { appearance: 'error' })
      } else {
        addToast('Saved Successfully', { appearance: 'success' });
      }
    }

    return (
      <div
        className="d-flex flex-column mx-auto"
        style={{
          maxWidth: "400px",
          boxShadow: "0 5px 15px #dcdada, 0 2px 3px #dcdada",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h2 className="text-center mb-3 theme-hover form-header">
          Send Feedback
    </h2>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="Email"
          />
          <small className="form-text text-muted">
            We'll never share your email with anyone else.
      </small>
        </div>
        <div className="form-group">
          <label>Comments</label>
          <textarea
            className="form-control"
            id="comments"
            aria-describedby="Comments"
          />
        </div>

        <div className="form-group">
          <label>Rate Us</label>
          <div className="text-center">
            {[...Array(5)].map((res, i) => {
              return (
                <Star
                  size={"large"}
                  key={i + 1}
                  onMouseEnter={() => setHoverIndex(i + 1)}
                  onMouseLeave={() => setHoverIndex(0)}
                  onClick={() => setSelectedIndex(i + 1)}
                  color={
                    hoverIndex >= i + 1 || selectedIndex >= i + 1
                      ? "#69884D"
                      : "silver"
                  }
                />
              );
            })}
          </div>
        </div>

        <button type="submit" onClick={onSubmit} className="btn btn-primary mt-3">
          Submit
    </button>

      </div>

    )
  }

  return (

    <div className="page-content container">
      <div className="d-flex flex-column">
        <h2 className="page-title">We would love to hear from you!</h2>
        <h5 className="sdetail-description text-justify">
          At <b>Them</b>, we translate our/your vision into reality. The
          projects of our studios are fulfilled considering your taste and our
          designs with latest designs. We provide you an album of visualizations
          which are both functional and aesthetic. With this approach, you
          receive an everlasting experience of living in your space and we
          receive imense satisfaction.
        </h5>
      </div>

      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        placement="bottom-center">
        <FormWithToasts />
      </ToastProvider>
    </div>

  );
}
export default FeedBack;
