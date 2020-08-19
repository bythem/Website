import React, { useState, useEffect, useParams } from "react";
import { Star, BottomCorner } from "grommet-icons";
import { ToastProvider, useToasts } from "react-toast-notifications";
import PageContent from "../components/pagecontent";
import { db } from "../firebase";
import { get } from "jquery";
export default function FeedBack(props) {
  // Declare a new state variable, which we'll call "count"  const [count, setCount] = useState(0);
  //const { addToast } = useToasts()

  const [formSubmittedMessage, setFormSubmittedMessage] = useState("");
  const [requiredFieldErrorMessage, setRequiredFieldErrorMessage] = useState();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fpId, setFpId] = useState("");

  useEffect(() => {
    let fpId = props.match.params.feedbackid;
    setFpId(fpId);
    document.title = "THEM | Feedback";
    console.log("test");
    getFeedBackStatus(fpId);
  }, []);

  function getFeedBackStatus(id) {
    let feedbackref = db.ref("feedbacks");
    feedbackref
      .orderByChild("customerproject_id")
      .equalTo(id)
      .once("value", (snapshot) => {
        if (snapshot.val()) {
          setFormSubmitted(true);
          setFormSubmittedMessage(
            "It looks like you already submitted the feedback. Thank you so much !!"
          );
        } else {
          setFormSubmitted(false);
        }
      });
  }

  const FormWithToasts = () => {
    const { addToast } = useToasts();
    const [email, setEmail] = useState("");
    const [comments, setComments] = useState("");
    const [hoverIndex, setHoverIndex] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [state, setState] = useState({
      email: "",
      comments: "",
      selectedIndex: 0,
      hoverIndex: 0,
    });
    function submitForm() {
      if (fpId && email && comments && parseInt(selectedIndex) > 0) {
        if (email.indexOf("@") > 0 && email.indexOf(".") > 0) {
          const feedbackID = db.ref("/feedbacks").push();
          feedbackID.set(
            {
              customerproject_id: fpId,
              feedback_email: email,
              feedback_rating: selectedIndex,
              feedback_comments: comments,
              feedback_viewed: false,
              feedback_created_at: Date.now(),
            },
            function (error) {
              console.log(error);
              if (error) {
                addToast(
                  "Sorry for the inconvenience, please try again later.",
                  {
                    appearance: "error",
                  }
                );
              } else {
                setFormSubmitted(true);
                setRequiredFieldErrorMessage(null);
                setFormSubmittedMessage("Thank you for your Feedback.");
                addToast("Saved Successfully", { appearance: "success" });
              }
            }
          );
        } else {
          setRequiredFieldErrorMessage("Please enter valid Email Address.");
        }
      } else {
        setRequiredFieldErrorMessage("Please complete all the below field(s).");
      }
    }

    return (
      <React.Fragment>
        {formSubmitted ? (
          <>{formSubmittedMessage}</>
        ) : (
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
            {requiredFieldErrorMessage ? (
              <small className="text-center mb-3 text-danger">
                {requiredFieldErrorMessage}
              </small>
            ) : null}

            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
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

            <button
              type="submit"
              onClick={submitForm}
              className="btn btn-primary mt-3"
            >
              Submit
            </button>
          </div>
        )}
      </React.Fragment>
    );
  };
  return (
    <div className="page-content container">
      <div className="mb-5">
        <PageContent pagecontentid="-MEzeDwKWa-rl6U2E03i" />
      </div>
      {formSubmitted ? (
        <>
          <div className="card text-center theme font-weight-bold">
            <div className="card-body">{formSubmittedMessage}</div>
          </div>
        </>
      ) : (
        <ToastProvider
          autoDismiss
          autoDismissTimeout={6000}
          placement="top-center"
        >
          <FormWithToasts />
        </ToastProvider>
      )}
    </div>
  );
}
