import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notifications);

  return <div className={notification.type}>{notification.content}</div>;
};

export default Notification;
