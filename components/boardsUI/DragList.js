"use client";
import { Reorder, useDragControls } from "framer-motion";
import List from "@/components/boardsUI/List";

export default function DragList({ list, boardId }) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      key={list._id}
      value={list}
      dragListener={false}
      dragControls={dragControls}
      className="flex-shrink-0 w-[20vw]"
    >
      <List list={list} boardId={boardId} dragControls={dragControls} />
    </Reorder.Item>
  );
}
