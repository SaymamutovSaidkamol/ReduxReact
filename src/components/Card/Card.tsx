import React, { FC, useState } from "react"
import { IRecipe } from "../../types"
import { useDispatch } from "react-redux"
import { toggleSaved } from "../../redux/features/saved.slice"
import { styled } from '@mui/material/styles';


import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { BiHeart } from "react-icons/bi";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Modal, Input, InputNumber } from 'antd';
import Skeleton from '@mui/material/Skeleton';
import { Image } from 'antd';
import Menu from '@mui/material/Menu';
import axios from "axios";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

interface Props {
    data: IRecipe[] | undefined
    setData?: React.Dispatch<React.SetStateAction<any[]>>; // setData ni qo'shing
    loading?: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

const CardProd: FC<Props> = ({ data, setData, loading }) => {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<any>(null);
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;
    const handleClick = (event: React.MouseEvent<HTMLElement>, item: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedItem(item);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDelete = () => {
        console.log("Salom", selectedItem);

        axios.delete(`https://6764223a52b2a7619f5b899a.mockapi.io/Coutry/${selectedItem.id}`).then((res) => {
            setData!(data!.filter(prev => prev.id != res.data.id))
            handleClose()
        })
    }


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
        handleClose()
    };


    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const dispatch = useDispatch()
    return (
        <>
            <div>
                <div className='grid grid-cols-4 gap-10 p-3'>
                    {
                        data?.map((item) => (
                            <Card sx={{ maxWidth: 345 }} key={item.id} className=''>
                                <CardHeader
                                    avatar={
                                        loading ? (<Skeleton animation="wave" variant="circular" width={40} height={40} />) : (<Avatar aria-label="recipe">
                                            <img src='https://burst.shopifycdn.com/photos/photography-product-download.jpg?width=1000&format=pjpg&exif=0&iptc=0' alt="" />
                                        </Avatar>)
                                    }
                                    action={
                                        <IconButton aria-label="settings" onClick={(e) => handleClick(e, item)}>
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={item.name}
                                    subheader="September 14, 2016"
                                />
                                <Menu
                                    id="long-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    slotProps={{
                                        paper: {
                                            style: {
                                                maxHeight: ITEM_HEIGHT * 4.5,
                                                width: '20ch',
                                            },
                                        },
                                    }}
                                >
                                    <div className='flex flex-col px-2 gap-3'>
                                        <div className='flex px-2 cursor-pointer rounded-[5px] text-white bg-green-400 items-center'>
                                            <button className='w-full' onClick={showModal}>Edit</button>
                                            <FaRegEdit className='text-[24px] text-green-900' />
                                        </div>
                                        <div className='flex px-2 cursor-pointer rounded-[5px] text-white bg-red-900 items-center'>
                                            <button className='w-full' onClick={handleDelete} >Delete</button>
                                            <RiDeleteBin6Line className='text-[24px] text-red-600' />
                                        </div>
                                    </div>
                                </Menu>
                                {
                                    loading ? <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" /> : (
                                        <div>
                                            <Image
                                                src='https://burst.shopifycdn.com/photos/photography-product-download.jpg?width=1000&format=pjpg&exif=0&iptc=0'
                                            />
                                        </div>
                                    )
                                }
                                {
                                    loading ? (<React.Fragment>
                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                        <Skeleton animation="wave" height={10} width="80%" />
                                    </React.Fragment>) :
                                        (<CardContent>
                                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                <h1 className='text-[20px] font-bold text-black'>{item.name}</h1>
                                            </Typography>
                                            <div className='py-2'>
                                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                                    <strong>total price: {item.price} USD</strong>
                                                </Typography>
                                            </div>
                                            <div className='mt-5 w-full flex items-center justify-center text-center'>
                                                <Stack spacing={1} className=''>
                                                    <Rating name="half-rating" precision={0.5} />
                                                </Stack>
                                            </div>
                                        </CardContent>)
                                }
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        <button className='' onClick={() => dispatch(toggleSaved(item))}>
                                            <BiHeart />
                                        </button>
                                    </IconButton>
                                    <IconButton aria-label="share">
                                    </IconButton>
                                    <ExpandMore
                                        expand={expanded}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography sx={{ marginBottom: 2 }}><strong>Retsept:</strong></Typography>
                                        <Typography sx={{ marginBottom: 2 }}>
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        ))
                    }
                </div>
            </div>


            <Modal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="flex flex-col gap-3">
                    <Input placeholder='name...' />
                    <InputNumber className='w-full border' placeholder='price...' />
                    <Input placeholder='image URL...' />
                    <Input placeholder='description...' />
                    <Button type="primary" htmlType="submit" className='w-full' loading={loading} onClick={handleCancel}>
                        Change
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export default CardProd
