import React, { useState, useEffect } from 'react';
import useDeck from "../hooks/useDeck";

const Ssuit = ({ cardNumber }) => {
  const { getCardSuite, suites } = useDeck();
  const [suite, setSuite] = useState(getCardSuite(cardNumber));

  useEffect(() => {
    setSuite(getCardSuite(cardNumber));
  }, [cardNumber, getCardSuite]);

  const renderSvg = (path) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
      <path d={path} />
    </svg>
  );

  if (suite === suites[0]) {
    return renderSvg("M19.6 32.3c.2-.2.4-.2.6 0l5.8 5.4v.3l-12.4-.1c-.2 0-.2-.2 0-.3 2.3-2.2 5-4.4 6-5.3zm0-31c.5-.4 1-.4 1.5 0 3.2 3.2 10.2 11 13.3 15 3.5 4.6 3.5 9.9-.2 13.5-3.8 3.7-10.5 3.7-13.3-.2-.3-.3-.5-.7-.6-1.2h-.8c0 .4-.3.8-.6 1.2-3 3.3-9.8 3.5-13.4-.2-3.6-3.8-3-9.4.2-13.5 2.8-3.4 10-11 13.9-14.6z");
  } else if (suite === suites[1]) {
    return renderSvg("M20.8 36.5c3.1-2.8 11-11.1 14.1-14.9 3.4-4 4.5-10.4.7-14.4S24.7 3 21.1 7.4c-.4.4-.6.8-.6 1.2h-.9c0-.4-.3-.8-.5-1.2C15.8 3 8.8 3 4.9 6.8c-4 3.7-3.7 9.5-.2 14.2 3.1 4.2 10.7 12.6 13.8 15.5.6.6 1.8.5 2.3 0z");
  } else if (suite === suites[2]) {
    return renderSvg("M20 32.8c.2-.2.4-.2.6 0 1 .8 3.5 2.7 6.1 5 .2 0 0 .2-.1.2l-12.9-.1c-.2 0-.2-.2 0-.3l6.3-4.8zM20.2 2c5.4 0 9.8 4 9.8 9.1 0 1.4-.4 2.7-1 3.8 0 .2.2.5.3.5 5 .6 8.7 4.4 8.7 9 0 5.1-4.4 9.2-9.8 9.2a10 10 0 01-7.8-3.6c-.1-.2-.7-.1-.8 0a10 10 0 01-7.8 3.6c-5.4 0-9.8-4-9.8-9.1 0-4.8 4-8.7 9-9 .1-.1.3-.4.2-.6a8.6 8.6 0 01-.8-3.8c0-5 4.3-9.1 9.8-9.1z");
  } else if (suite === suites[3]) {
    return renderSvg("M21.7 2.2c.8.7 9.1 8.5 16 16.2.7.8.9 1.8-.2 3.2-.7.8-6.3 7.4-16.2 16.4-.8.7-1.5.7-2.6 0-.6-.6-6.6-6-16.6-16.6-1-1-1-1.9-.2-2.8A216 216 0 0118.4 2.2c1.3-1 2-1 3.3 0z");
  }

  return null;
};

export default Ssuit;
