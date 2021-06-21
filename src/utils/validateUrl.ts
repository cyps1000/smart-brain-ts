/**
 * RegExps.
 * A URL must match #1 and then at least one of #2/#3.
 * Use two levels of REs to avoid REDOS.
 */
// eslint-disable-next-line
const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;
// eslint-disable-next-line
const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
// eslint-disable-next-line
const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;

/**
 * Checks if the input is a valid url
 */
export const isURL = (url: string) => {
  if (typeof url !== "string") {
    return false;
  }

  let match = url.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }

  const everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }

  if (
    localhostDomainRE.test(everythingAfterProtocol) ||
    nonLocalhostDomainRE.test(everythingAfterProtocol)
  ) {
    return true;
  }

  return false;
};
