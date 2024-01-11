// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import { styled } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MuiDivider from '@mui/material/Divider'
import Avatar from '@mui/material/Avatar'

const renderFeaturedArtists = (featuredArtists) => {   
  return featuredArtists.map((item, index) => {
    return (
      <Box
        key={item.title}
        sx={{ display: 'flex', alignItems: 'center', mb: index !== featuredArtists.length - 1 ? 6 : 0 }}
      >
        <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
          {/* <img src={item.logo} alt= width={item.logoWidth} height={item.logoHeight} /> */}
          <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  marginRight: 3,
                  fontSize: '1rem',
                  color: 'common.white',
                  backgroundColor: `primary.main`
                }}
              >
                {item.profile_id.fullName.split(' ').map((name) => name[0]).join('').toUpperCase()}
              </Avatar>
          
        </Box>
        <Box
          sx={{
            ml: 4,
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.profile_id.fullName}</Typography>
            <Typography variant='caption'>
            {item.services?.map((service, i) => (i === item.services.length - 1 ? service.title : `${service.title}, `))}
            </Typography>                         
          </Box>
          <Typography variant='subtitle2' sx={{ fontWeight: 600, color: 'success.main' }}>
            {item.pricing.totalPrice}
          </Typography>
        </Box>
      </Box>
    )
  })
}

const renderEmergingArtists = (emergingArtists) => {   
  return emergingArtists.map((item, index) => {
    return (
      <Box
        key={item.title}
        sx={{ display: 'flex', alignItems: 'center', mb: index !== emergingArtists.length - 1 ? 6 : 0 }}
      >
        <Box sx={{ minWidth: 38, display: 'flex', justifyContent: 'center' }}>
          {/* <img src={item.logo} alt={item.title} width={item.logoWidth} height={item.logoHeight} /> */}
          <Avatar
                sx={{
                  width: 38,
                  height: 38,
                  marginRight: 3,
                  fontSize: '1rem',
                  color: 'common.white',
                  backgroundColor: `primary.main`
                }}
              >
                {item.profile_id.fullName.split(' ').map((name) => name[0]).join('').toUpperCase()}
              </Avatar>
        </Box>
        <Box
          sx={{
            ml: 4,
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ marginRight: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{item.profile_id.fullName}</Typography>
            <Typography variant='caption'>
            {item.services?.map((service, i) => (i === item.services.length - 1 ? service.title : `${service.title}, `))}
            </Typography>                         
          </Box>
          <Typography variant='subtitle2' sx={{ fontWeight: 600, color: 'success.main' }}>
            {item.pricing.totalPrice}
          </Typography>
        </Box>
      </Box>
    )
  })
}



// Styled Divider component
const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(5, 0),
  borderRight: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down('md')]: {
    borderRight: 'none',
    margin: theme.spacing(0, 5),
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}))

const DepositWithdraw = ({featuredArtists , emergingArtists}) => {

  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: ['column', 'column', 'row'] }}>
      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='Featured Artist'
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={<Typography variant='caption'>View All</Typography>}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>
          
            {renderFeaturedArtists(featuredArtists)}
        </CardContent>
      </Box>

      <Divider flexItem />

      <Box sx={{ width: '100%' }}>
        <CardHeader
          title='Emerging Artist'
          sx={{ pt: 5.5, alignItems: 'center', '& .MuiCardHeader-action': { mt: 0.6 } }}
          action={<Typography variant='caption'>View All</Typography>}
          titleTypographyProps={{
            variant: 'h6',
            sx: { lineHeight: '1.6 !important', letterSpacing: '0.15px !important' }
          }}
        />
        <CardContent sx={{ pb: theme => `${theme.spacing(5.5)} !important` }}>         
          {renderEmergingArtists(emergingArtists)}
        </CardContent>
      </Box>
    </Card>
  )
}

export default DepositWithdraw
