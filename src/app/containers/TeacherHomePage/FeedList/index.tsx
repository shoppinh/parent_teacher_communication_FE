import React from 'react';
import { styled } from 'twin.macro';
import PostItem from './PostItem';
import { Post } from '../../../../types/Post';

const Container = styled.div``;

const FeedList = () => {
  const postList: Post[] = [
    {
      _id: '1',
      content: 'hello world',
      title: 'hello world',
      author: {
        _id: '1',
        fullName: 'Kien mAc',
        userName: 'kienneik',
        mobilePhone: '0397273869',
        avatar: 'test-image',
      },
      comments: [
        {
          _id: '1',
          content: 'hello world',
          author: {
            _id: '2',
            fullName: 'Kien mAc 2',
            userName: 'kienneik',
            mobilePhone: '0397273869',
          },
        },
        {
          _id: '2',
          content: 'hello world',
          author: {
            _id: '2',
            fullName: 'Kien mAc 2',
            userName: 'kienneik',
            mobilePhone: '0397273869',
          },
        },
      ],
    },
    {
      _id: '2',
      content: 'hello world',
      title: 'hello world',
      author: {
        _id: '1',
        fullName: 'Kien mAc',
        userName: 'kienneik',
        mobilePhone: '0397273869',
        avatar: 'test-image',
      },
      comments: [
        {
          _id: '1',
          content: 'hello world',
          author: {
            _id: '2',
            fullName: 'Kien mAc 2',
            userName: 'kienneik',
            mobilePhone: '0397273869',
          },
        },
        {
          _id: '2',
          content: 'hello world',
          author: {
            _id: '2',
            fullName: 'Kien mAc 2',
            userName: 'kienneik',
            mobilePhone: '0397273869',
          },
        },
      ],
    },
  ];
  return (
    <Container>
      {postList.map((post) => (
        <PostItem
          postContent={post.content}
          authorName={post.author?.fullName || 'Unknown'}
          authorAvatar={post.author.avatar || 'test-image'}
          postTitle={post.title}
          commentList={post.comments}
          key={post._id}
        />
      ))}
    </Container>
  );
};

export default FeedList;
