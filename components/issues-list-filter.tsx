import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'

export default function IssuesListFilter({
  state,
  setState,
}: {
  state: string
  setState: Dispatch<SetStateAction<string>>
}) {
  return (
    <Menu matchWidth>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        textTransform="capitalize"
      >
        {state}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => setState('all')}>All</MenuItem>
        <MenuItem onClick={() => setState('open')}>Open</MenuItem>
        <MenuItem onClick={() => setState('in progress')}>In Progress</MenuItem>
        <MenuItem onClick={() => setState('done')}>Done</MenuItem>
      </MenuList>
    </Menu>
  )
}
