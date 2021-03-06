import { getRecentAlbums } from "./recent-albums";

jest.mock("../api/album-service");

// Mocking with jest for Promise based APIs
describe("getRecentAlbums", () => {
  it("should get recent albums", async () => {
    const albums = await getRecentAlbums();
    const expectedAlbums = ["The Sciences", "The Clarity"];
    expect(albums).toEqual(expectedAlbums);
  });

  it("should get recent albums with resolves", async () => {
    const expectedAlbums = ["The Sciences", "The Clarity"];
    // await expect(getRecentAlbums()).resolves.toEqual(expectedAlbums);
  });
});
