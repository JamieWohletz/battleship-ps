module Main where

import Prelude
import Battleship
import Draw
import Control.Monad.Eff.JQuery
import Control.Monad.Eff (Eff)
import DOM (DOM)
import Partial.Unsafe (unsafePartial, unsafePartialBecause)
import Text.Smolder.Renderer.String (render)

main :: forall eff. Eff (dom :: DOM | eff) Unit
main = do
  body <- select "body"
  setHtml html body
  where html = render $ 
    unsafePartialBecause "Board was incorrectly constructed!" $
      boardToHtml $
        board 5 10

