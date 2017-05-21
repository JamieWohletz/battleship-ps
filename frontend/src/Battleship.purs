module Battleship where

import Data.Functor (map)
import Data.Map (Map, empty, insert, lookup)
import Data.Maybe (Maybe(..))
import Data.Ordering (Ordering(..))
import Prelude (class Eq, class Ord, class Show, otherwise, show, ($), (&&), (<), (<>), (==), (>), (||))

data TileType = Ocean | Ship
data Tile = Tile {
  type :: TileType,
  attacked :: Boolean
}

newtype Point = Point { x :: Int, y :: Int }
instance eqPoint :: Eq Point where
  eq (Point { x, y }) (Point { x: x2, y: y2}) = x == x2 && y == y2

instance ordPoint :: Ord Point where
  compare p1@(Point { x, y }) p2@(Point { x: x2, y: y2}) 
    | p1 == p2 = EQ
    | x < x2 || y < y2 = LT
    | otherwise = GT

instance showPoint :: Show Point where
  show (Point { x, y }) = "(" <> (show x) <> ", " <> (show y) <> ")"

type Board = {
  grid :: Map Point Tile,
  width :: Int,
  height :: Int
}

ocean :: Tile
ocean = Tile {
  type: Ocean,
  attacked: false
}

board :: Int -> Int -> Maybe Board
board w h
  | w < 0 || h < 0 = Nothing
  | otherwise = Just { grid: (empty :: Map Point Tile), width: w, height: h }

attack :: Point -> Board -> Board
attack p bd@{ grid } = bd {
  grid = (insert p newTile grid)
}
  where 
    (Tile tile) = unwrapTile (lookup p grid)  
    newTile = Tile $ tile { attacked = true }

unwrapTile :: Maybe Tile -> Tile
unwrapTile Nothing  = ocean
unwrapTile (Just t) = t

tileAt :: Point -> Board -> Maybe Tile
tileAt p@(Point { x, y }) { width, height, grid }
  | x < 0 || x > width || y < 0 || y > height = Nothing
  | otherwise = Just (unwrapTile $ lookup p grid)

