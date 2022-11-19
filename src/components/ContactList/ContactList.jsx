import { Button } from 'components/common.styled';
import { List, Item, Name, Phone } from './ContactList.styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectVisibleContacts } from 'redux/selectors';
import { deleteContact } from 'redux/operations';
const ContactList = () => {
  const dispatch = useDispatch();
  const visibleContacts = useSelector(selectVisibleContacts);
  return (
    <>
      {visibleContacts.length > 0 ? (
        <List>
          {visibleContacts.map(({ id, name, phone }) => (
            <Item key={id}>
              <div>
                <Name>{name}</Name>
                <Phone>
                  {phone.replace(/(\d{3})(\d{2})(\d{2})/, '$1-$2-$3')}
                </Phone>
              </div>
              <Button
                onClick={() => {
                  dispatch(deleteContact(id));
                }}
              >
                Delete
              </Button>
            </Item>
          ))}
        </List>
      ) : (
        <p>Nothing found</p>
      )}
    </>
  );
};

export default ContactList;
