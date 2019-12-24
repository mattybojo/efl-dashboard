export function convertSnaps<T>(snaps) {
  return <T[]> snaps.map(snap => {
    return {
      id: snap.payload.doc.id,
      ...snap.payload.doc.data()
    };
  });
}

export function convertSnap<T>(snap) {
  return {
    id: snap[0].payload.doc.id,
    ...snap[0].payload.doc.data()
  };
};

export function deleteId(object: any): any {
  delete object.id;
  return object;
}

