import React, {useContext, useEffect, useRef} from 'react';

import {SideDrawerContext} from '../../shared/context/SideDrawerContext';
import {useForm} from '../../shared/hooks/FormHook';

import Input from '../../shared/components/form/form-elements/Input';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH} from '../../shared/components/util/Validators';
import Button from '../../shared/components/form/form-elements/Button';
// import ImageUpload from
// '../../shared/components/form/form-elements/ImageUpload';

import {useQuery} from 'react-query';
import {AppConfig} from '../../App.config';
import axios from 'axios';
import {AuthContext} from '../../shared/context/AuthContext';
import {UserRepliesContext} from '../context/UserRepliesContext';

const CreatePost = props => {

    const side = useContext(SideDrawerContext);
    const auth = useContext(AuthContext);
    const userReplies = useContext(UserRepliesContext);

    let {initReplyContent} = props;

    const comment = useRef();
    const options = useRef();

    const [formState,
        inputHandler] = useForm({
        options: {
            value: '',
            isValid: true
        },
        comment: {
            value: '',
            isValid: false
        }
    }, false)

    const updatePostRef = (e) => {
        const refOptions = e.target.parentNode.parentNode[0].value;
        const refComment = e.target.parentNode.parentNode[1].value;

        comment.current = refComment;
        options.current = refOptions;
    }

    useEffect(() => {
        if (initReplyContent) {
            comment.current = initReplyContent
        }

        return () => {
            props.updateCreatePostContent(options.current, comment.current)
        };
    }, [props.updateCreatePostContent, initReplyContent, props])

    let {isLoading, error, refetch} = useQuery('createPost', async() => {
        try {
            let formData = {
                "comment": comment.current,
                "options": options.current,
                "thread_id": props.thread_id
            }

            if (auth.loginState.id) {
                formData["user_id"] = auth.loginState.id;
            }

            const submitPostData = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/post/create`, formData, {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                withCredentials: true
            });

            setTimeout(() => {
                side.displayAlertMsg(false);
                side.toggleOpen();
                userReplies.removeReply(props.thread_id);
                props.clearReplyContent();
                props.refresh();
            }, 1500)

            side.displayAlertMsg('upload success!');
            side.setContent('...');

            return submitPostData;

        } catch (err) {
            return err;
        }
    }, {
        manual: true,
        enabled: false
    })

    if (isLoading) 
        return 'Loading...';
    
    if (error) 
        return 'An error has occurred: ' + error.message;
    
    const createPostSubmitHandler = (e) => {
        e.preventDefault();
        refetch();
    }

    return <React.Fragment>
        <form
            onChange={(e) => updatePostRef(e)}
            onSubmit={(e) => createPostSubmitHandler(e)}>
            <Input
                element="input"
                id="options"
                initialValue={false}
                type="text"
                label="options"
                placeholder="options"
                initialValid='truthy'
                validators={[]}
                onInput={inputHandler}></Input>

            <Input
                autoresize
                element=""
                className='text-sm'
                id="comment"
                type="text"
                label="reply *"
                initialValue={initReplyContent}
                placeholder="reply"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(400)]}
                errorText="Min 5 chars, max 400 chars"
                onInput={inputHandler}></Input>

            <Button type="submit" disabled={!formState.isValid}>
                Post
            </Button>
        </form>
    </React.Fragment>
}

export default CreatePost;