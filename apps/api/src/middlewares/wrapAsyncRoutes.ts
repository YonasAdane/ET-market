import express, { Router } from "express";
import asyncHandler from "./asyncHandler";

const wrapAsyncRoutes = (router: Router) => {
  router.stack.forEach(layer => {
    if (layer.route) {
      layer.route.stack.forEach(route => {
        route.handle = asyncHandler(route.handle);
      });
    }
  });
  return router;
};

export { wrapAsyncRoutes };
