const { Box, Paper } = require('@mui/material');
const {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
  Cell,
} = require('recharts');

const ChartResultArea = ({ data }) => {
  const barColors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728'];
  return (
    <div className="chart__container">
      <ResponsiveContainer width="90%" height={350}>
        <BarChart data={data}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="name" tick={{ fill: 'white' }} stroke="white" />
          <YAxis tick={{ fill: 'white' }} stroke="white" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count">
            {data.map((entry, index) => (
              <Cell key={`cell-${index * 10}`} fill={barColors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
const MultipleChoiceDemo = ({
  question,
  answers,
  handleClickAnswer,
  chartData,
}) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 8,
            px: 6,
            minHeight: 128,
          },
        }}
      >
        <Paper className="demo__question" variant="outlined">
          {question}
        </Paper>
      </Box>
      <Box sx={{ width: '100%' }}>
        <ChartResultArea data={chartData} />
      </Box>
    </>
  );
};

export default MultipleChoiceDemo;
