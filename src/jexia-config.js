import { jexiaClient, realTime } from "jexia-sdk-js";

const rtm = realTime();
jexiaClient().init({
  projectID: "your-project-id",
  key: "your-key",
  secret: "your-secret"
}, rtm);

const channel = rtm.channel("chat");

channel.subscribe(
  (message) => {
    console.log(message); // we've got a message from the channel
  },
  (error) => {
    console.log(error); 
  },
  () => { // complete
    // connection to the channel has been closed
  }
);

channel.publish({
  product: "apple",
  amount: 42
});

channel
  .getLog(field => field("sender_id").isEqualTo(user.id))  // Same filters as in DataSet
  .subscribe(
    (messages) => {
      console.log(messages);
    },
    (error) => {
      console.log(error); 
});
