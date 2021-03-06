import React from "react";
import Screen from "./Screen";
import Particpant from "./VideoTile";
import {
  useHMSStore,
  selectLocalPeer,
  selectPeers,
  selectIsSomeoneScreenSharing,
  selectPeersScreenSharing
} from "@100mslive/react-sdk";
import ControlSection from "./ControlSection";

export default function ConferenceRoom() {
  // access room information from 100ms store

  const localPeer = useHMSStore(selectLocalPeer);

  const screenshareOn = useHMSStore(selectIsSomeoneScreenSharing);

  const presenters = useHMSStore(selectPeersScreenSharing);

  const peers = useHMSStore(selectPeers);

  // number of active screen participants plus screen presenters
  const particpants = peers.length + presenters.length;


  return (
    <div className="h-screen w-full bg-main flex">
      <div className="flex flex-col w-full h-full justify-between items-center">
        <div className="max-w-6xl flex items-center justify-center mx-auto h-[80vh] mt-16 container">
          <div
            className={`grid ${
              particpants <= 4
                ? "grid-cols-2 grid-rows-2"
                : "grid-cols-4 grid-rows-4"
            } items-center justify-center content-center  w-full gap-3 h-full`}
          >
            {/* Display local particpant view */}
            <div
              className={`w-full h-full relative ${
                particpants <= 4 ? "max-h-[20rem]" : "max-h-[10rem]"
              } bg-accent rounded-lg flex items-center justify-center`}
            >
              {!localPeer ? null : (
                <Particpant isLocal={true} peer={localPeer} />
              )}

              <div className="absolute bottom-1 z-[99] left-1">
                <span className="bg-black bg-opacity-40 p-1 px-4 text-xs rounded-3xl text-white">
                  {localPeer?.name} (
                  {localPeer?.roleName === "host" ? "Host," : null} me)
                </span>
              </div>
            </div>

            {/* display other particants views */}
            {peers &&
              // Array(6).fill(" ")
              peers
                .filter((peer) => !peer.isLocal)
                .map((peer) => {
                  return (
                    <>
                      {" "}
                      <div
                      className={`w-full h-full relative ${
                        particpants <= 4 ? "max-h-[20rem]" : "max-h-[10rem]"
                      } bg-accent rounded-lg flex items-center justify-center`}
              >
                        {!peer ? null : (
                          <Particpant isLocal={false} peer={peer} />
                        )}
                        <div className="absolute bottom-1 z-[99] left-1">
                          <span className="bg-black bg-opacity-40 p-1 px-4 text-xs rounded-3xl text-white">
                            {peer?.name} (
                            {peer?.roleName === "host" ? "Host," : null}{" "}
                            me)
                          </span>
                        </div>
                      </div>
                    </>
                  );
                })}

            {/* display screens shared  to particpants */}

            {screenshareOn &&
              presenters &&
              presenters.map((presenter) => {
                return (
                  presenter && (

                    <>
                      <div
                        className={`w-full h-full ${
                          particpants <= 4 ? "max-h-[20rem]" : "max-h-[10rem]"
                        } bg-accent rounded-lg flex items-center justify-center`}
                      >
                        <Screen isLocal={false} presenter={presenter} />
                      </div>
                    </>
                  )
                );
              })}

          </div>
        </div>
        <ControlSection />
      </div>
    </div>
  );
}
