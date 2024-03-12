import { useState, useEffect } from "react";
import "./Notification.css"; 

const Notification = ({ message , className=""}) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      console.log("notification component ran");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {show && (
        <div className="notification-container">
          <div className="notification-slide-in">
            <div className={`bg-green-500 text-white px-4 py-2 rounded-md shadow-md flex items-center ${className}`} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-10 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p>{message}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notification;
