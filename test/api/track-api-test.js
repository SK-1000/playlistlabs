import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { playtimeService } from "./playtime-service.js";
import { maggie, mozart, testPlaylists, testTracks, concerto } from "../fixtures.js";

suite("Track API tests", () => {
  let user = null;
  let beethovenSonatas = null;

  setup(async () => {
    playtimeService.clearAuth();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggie);
    await playtimeService.deleteAllPlaylists();
    await playtimeService.deleteAllTracks();
    await playtimeService.deleteAllUsers();
    user = await playtimeService.createUser(maggie);
    await playtimeService.authenticate(maggie);
    mozart.userid = user._id;
    beethovenSonatas = await playtimeService.createPlaylist(mozart);
  });

  teardown(async () => {});

  test("create track", async () => {
    const returnedTrack = await playtimeService.createTrack(beethovenSonatas._id, concerto);
    assertSubset(concerto, returnedTrack);
  });

  test("create Multiple tracks", async () => {
  });

  test("Delete Track", async () => {
  });

  test("test denormalised playlist", async () => {
  });
});