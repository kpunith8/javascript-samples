import service from '../api/album-service'

export function getRecentAlbums() {
  return service().then((albums) => {
    return albums
      .reverse()
      .slice(0, 2)
      .map(({ title }) => title);
  });
}