import axios from "axios";
import service from "./album-service";

jest.mock("axios");

describe("album service", () => {
  test("should get albums", () => {
    const albums = [{ title: "Wild life" }];
    const resp = { data: albums };
    axios.get.mockResolvedValue(resp);

    return service().then((data) => expect(data).toEqual(albums));
  });

  test("should get albums with async", async () => {
    const albums = [{ title: "Wild life" }];
    const resp = { data: albums };
    axios.get.mockResolvedValue(resp);

    await expect(service()).resolves.toEqual(albums) //.then((data) => expect(data).toEqual(albums));
  });
});
