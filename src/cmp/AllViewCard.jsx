import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';

import { saveAs } from 'file-saver'

const AllViewCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalHovered, setIsModalHovered] = useState(false);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const downloadImage = (ImagePath,) => {
    saveAs(ImagePath, 'AIGenerateimage.jpg') // Put your image URL here.
  }
  

  return (
    <>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          backgroundColor: '#fff',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
          }
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleOpen}
      >
        <div style={{ 
          overflow: 'hidden', 
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}>
          <CardMedia
            component="img"
            height="350"
            image={item.ImagePath || "https://via.placeholder.com/150"}
            alt="Generated Image"
            sx={{ 
              objectFit: 'cover',
              transition: 'all 0.5s ease-in-out',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              width: '100%',
              filter: isHovered ? 'brightness(0.95)' : 'brightness(1)'
            }}
          />
        </div>
        <CardContent sx={{ backgroundColor: '#fff' }}>
          <Typography variant="h6" component="div" gutterBottom>
            {item.Username}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {item.Email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Model: {item.Model}
          </Typography>
    
        </CardContent>
        <Button 
         onClick={(e) => {
          e.stopPropagation(); // Prevent event bubbling to the card's onClick
          downloadImage(item.ImagePath); // Call your specific function here
        }}
        color="success"
        variant="contained">Download</Button>
      </Card>

      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{
          backdropFilter: 'blur(3px)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '800px',
            maxHeight: '700px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 0,
            outline: 'none',
            borderRadius: 2,
            overflow: 'hidden',
          }}
          onMouseEnter={() => setIsModalHovered(true)}
          onMouseLeave={() => setIsModalHovered(false)}
        >
          <IconButton
            sx={{ 
              position: 'absolute', 
              top: 8, 
              right: 8, 
              zIndex: 1,
              color: 'red',
              opacity: isModalHovered ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <Box 
            sx={{ 
              position: 'relative',
              '&:hover .overlay': { opacity: 1 }
            }}
          >
            <CardMedia
              component="img"
              image={item.ImagePath || "https://via.placeholder.com/150"}
              alt="Generated Image"
              sx={{ 
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: 1,
              }}
            />
            <Box
              className="overlay"
              sx={{
                position: 'absolute',
                bottom: 100,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                opacity: 0,
                transition: 'opacity 0.3s ease-in-out',
                lineHeight: 1.5,
              }}
            >
              <Typography variant="h6" sx={{ mb: 1 }}>Name: {item.Username}</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>Model: {item.Model}</Typography>
              <Typography variant="body2">Prompt: {item.Prompt}</Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default AllViewCard;
