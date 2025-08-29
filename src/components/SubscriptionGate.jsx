function SubscriptionGate({ children, user }) {
  return (
    <div>
      {user ? children : <p>Please subscribe to access this feature.</p>}
    </div>
  );
}

export default SubscriptionGate;
