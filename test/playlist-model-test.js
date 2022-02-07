import { assert } from "chai";
import { db } from "../src/models/db.js";
import { study, testPlaylists } from "./fixtures.js";

suite("Playlists API tests", () => {

  setup(async () => {
    db.init();
    await db.playlistStore.deleteAllPlaylists();
    for (let i = 0; i < testPlaylists.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPlaylists[i] = await db.playlistStore.addPlaylist(testPlaylists[i]);
    }
  });

  test("create a playlist", async () => {
    const newPlaylist = await db.playlistStore.addPlaylist(study);
    assert.equal(newPlaylist, study);
  });

  test("delete all playlists", async () => {
    let returnedPlaylists = await db.playlistStore.getAllPlaylists();
    assert.equal(returnedPlaylists.length, 3);
    await db.playlistStore.deleteAllPlaylists();
    returnedPlaylists = await db.playlistStore.getAllPlaylists();
    assert.equal(returnedPlaylists.length, 0);
  });

  test("get a playlist - success", async () => {
    const playlist = await db.playlistStore.addPlaylist(study);
    const returnedPlaylist1 = await db.playlistStore.getPlaylistById(playlist._id);
    assert.equal(study, playlist);
  });

  test("delete One Playist - success", async () => {
    const id = testPlaylists[0]._id;
    await db.playlistStore.deletePlaylistById(id);
    const returnedPlaylists = await db.playlistStore.getAllPlaylists();
    assert.equal(returnedPlaylists.length, testPlaylists.length - 1);
    const deletedPlaylist = await db.playlistStore.getPlaylistById(id);
    assert.isNull(deletedPlaylist);
  });

  test("get a playlist - bad params", async () => {
    assert.isNull(await db.playlistStore.getPlaylistById(""));
    assert.isNull(await db.playlistStore.getPlaylistById());
  });

  test("delete One Playlist - fail", async () => {
    await db.playlistStore.deletePlaylistById("bad-id");
    const allPlaylists = await db.playlistStore.getAllPlaylists();
    assert.equal(testPlaylists.length, allPlaylists.length);
  });
});