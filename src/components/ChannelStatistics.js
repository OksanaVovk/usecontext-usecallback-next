import React from "react";
import { useContext, useState, useEffect } from "react";
import { ContactContext } from "./App";

function ChannelStatistics() {
  const { contactArray } = useContext(ContactContext);
  const [countChannels, setCountChannels] = useState(1);
  const [lastChannels, setLastChannels] = useState("");

  useEffect(() => {
    if (contactArray && Array.isArray(contactArray)) {
      setCountChannels(contactArray.length);
    } else {
      console.error("contactArray is not an array");
    }

    if (contactArray.length > 0) {
      const lastIndex = contactArray.length - 1;
      setLastChannels(
        contactArray[lastIndex].options !== "none" || ""
          ? contactArray[lastIndex].options
          : ""
      );
    } else {
      setLastChannels("");
    }
  }, [contactArray]);

  // NOTE: use Context to get info about entered contacts

  return (
    <p data-testid="statistics">
      Count of channels: {countChannels}
      <br />
      {lastChannels !== "" ? `your last channel is: ${lastChannels}` : null}
    </p>
  );
}

export default ChannelStatistics;
