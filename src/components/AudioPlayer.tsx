import Player from '@madzadev/audio-player';
import '@madzadev/audio-player/dist/index.css';
import React, { ReactElement, useEffect, useState } from 'react';
import { PlaylistsSlice } from '../store/PlaylistsSlice';
import { useSelector } from 'react-redux';
import { Empty, Spin, Typography } from 'antd';
import Playlist = PlaylistsSlice.Playlist;

export default function AudioPlayer(): ReactElement {
  return (
    <>
      <Typography.Title level={2}>Listen</Typography.Title>
      <PlaylistPlayer />
    </>
  );
}

function PlaylistPlayer(): ReactElement {
  const [player, setPlayer] = useState(<Spin />);
  const playlists = useSelector(PlaylistsSlice.selectAll);
  useEffect(() => {
    if (playlists.flatMap(({ tracks }) => tracks).length === 0) setPlayer(<Empty />);
    else
      readPlaylists(playlists).then((tracks) => {
        setPlayer(
          <Player
            trackList={tracks}
            includeTags={true}
            includeSearch={true}
            showPlaylist={true}
            autoPlayNextTrack={true}
          />,
        );
      });
  }, [playlists]);
  return player;
}

interface PlayableTrack {
  readonly url: string;
  readonly title: string;
  readonly tags: string[];
}

async function readPlaylists(playlists: Playlist[]): Promise<PlayableTrack[]> {
  const tracks = [];
  for (const playlist of playlists) tracks.push(await readPlaylist(playlist));
  return tracks.flat();
}

async function readPlaylist(playlist: Playlist): Promise<PlayableTrack[]> {
  const tracks = playlist.tracks.map(async (track) => {
    return { url: await generateUrl(track.base64Data), title: track.name, tags: [playlist.name] };
  });
  return await Promise.all(tracks);
}

/** Returns the file data as a URL. */
async function generateUrl(base64Data: string): Promise<string> {
  const response = await fetch(base64Data);
  const blob = new Blob([await response.arrayBuffer()]);
  return URL.createObjectURL(blob);
}
