module Main where

import Prelude
import Battleship
import Draw

import Control.Monad.Eff.JQuery
import Control.Monad.Eff (Eff)
import Control.Monad.Eff.Console (CONSOLE, log)
import Data.Maybe (Maybe(..))
import Text.Smolder.Renderer.String (render)

main = do
  body <- select "body"
  setHtml html body
  where html = render $ boardToHtml $ board 5 10