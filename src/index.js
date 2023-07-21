import { createNymMixnetClient } from "@nymproject/sdk";

const nymApiUrl = "https://validator.nymtech.net/api";

const main = async () => {
  // create a new client
  const nym = await createNymMixnetClient();
  console.log("Client >>>", nym);

  // start the client and wait 3 seconds for it to connect to the network
  await nym.client.start({ nymApiUrl, clientId: "My awesome client" });
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // get the client's address
  const selfAddress = await nym.client.selfAddress();
  console.log("Self address", selfAddress);

  // listen for incoming messages
  nym.events.subscribeToTextMessageReceivedEvent((event) => {
    console.log("Received a message!", event.args.payload);
  });

  // send a message to yourself
  console.log("Sending a message to myself...");
  nym.client.send({
    payload: { message: "Hello mixnet", mimeType: "text/plain" },
    recipient: selfAddress,
  });
};

// Start the app
main();
