const someMath = (() => {
  const horizontal = () => (Math.floor(Math.random() * 2) === 1 ? true : false);
  return { horizontal };
})();

export default someMath;
