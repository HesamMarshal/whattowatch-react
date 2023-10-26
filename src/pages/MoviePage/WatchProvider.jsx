import React from "react";
import ReactCountryFlag from "react-country-flag";
import justWatch from "../../assets/images/justwatch-logo.svg";
import { imageURL } from "../../Utils/utils";
import Loading from "../../components/Loading";

function WatchProvider({ providerList }) {
  if (Object.keys(providerList) === 0) return <Loading />;

  return (
    <div className="watchProvider">
      <img src={justWatch} alt="justWatch" className="justWatch" />
      <div className="providersList">
        {Object.entries(providerList).map((provider) => {
          const rentProvider = provider[1].rent;

          return (
            <div key={provider[0]} className="providerCountry">
              <div className="providerCountryName">
                Country:{" "}
                <ReactCountryFlag
                  svg
                  countryCode={provider[0]}
                  alt={provider[0]}
                />
              </div>
              <div className="rentProvider">
                {rentProvider?.map((rent) => (
                  <img
                    className="providerLogo"
                    src={imageURL + rent.logo_path}
                    alt={rent.provider_name}
                    key={rent.provider_name}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WatchProvider;
