/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
    Backdrop, Button, Box, Checkbox, Card, CardContent, TextField, Typography, Grid, IconButton, InputAdornment,
    FormHelperText, FormLabel, FormControlLabel, FormControl, Radio, RadioGroup, Table, TableHead, TableBody, TableSortLabel,
    TableCell, TableContainer, TableFooter, TablePagination, TableRow, Paper, FormGroup, Dialog, DialogTitle, DialogContent,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {
    Assignment, Close, Chat, Cake, SportsKabaddi, Favorite, Person, KeyboardArrowRight, KeyboardArrowLeft, LibraryMusic, LastPage, FirstPage,
    Save, Search, RecordVoiceOver, DirectionsWalk, PhotoCamera, Edit
} from "@material-ui/icons";
import Loader from "react-loader-spinner";
import PageLine from "../../../theme/PageLine";
import Swal from 'sweetalert2'
import config from '../../config';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    Refresh: {
        color: theme.palette.grey[500],
    },

    font_otp: {
        fontFamily: 'SemiBold',
        fontSize: '20px',
        textAlign: 'center',
    }
});

const StyledTableCell = withStyles(() => ({
    head: {
        backgroundColor: '#fcfcfc',
        fontFamily: "Regular",
        fontSize: 14,
    },
    body: {
        fontFamily: "Regular",
        fontSize: 14,
    }

}))(TableCell);

const StyledTableRow = withStyles(() => ({
    root: {
        '&:nth-of-type(odd)': {
            fontFamily: "Regular",
            fontSize: 14,
        },
    },
}))(TableRow);

const MuiDialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <DialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6" className={classes.font_otp}>{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <Close />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
});

const MuiDialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(DialogContent);

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
    Submit: {
        textAlign: "center",
    },
    Contentpdx16: {
        paddingBottom: '16px'
    },
    Contentpdx8: {
        paddingBottom: '8px'
    },
    IconSearch: {
        color: 'gray'
    },
    displayflex: {
        display: "flex",
        alignItems: "center",

    },
    displayflexHead: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    padding_table: {
        padding: theme.spacing(1)
    },
    Pagination: {
        flexShrink: 0,
        marginLeft: theme.spacing(4),
    },
    textField: {
        fontFamily: 'Regular',
        fontSize: '14px'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    font_usage: {
        fontFamily: 'Regular',
        margin: '4px',
        fontSize: '14px',
        textDecoration: 'underline',
        color: '#f44336',
        cursor: 'pointer'
    },
    font_header: {
        fontFamily: 'SemiBold',
        margin: '10px',
        fontSize: '18px'
    },
    font_subheader: {
        fontFamily: 'Regular',
        margin: '4px',
        fontSize: '14px'
    },
    font_normal: {
        fontFamily: 'Regular',
        fontSize: '14px'
    },
    font_smaller: {
        fontFamily: 'Regular',
        fontSize: '12px'
    },
    font_small: {
        fontFamily: 'Regular',
        fontSize: '12px',
        float: 'right'
    }
}));

function Loading({ classes, status }) {
    return (
        <Backdrop className={classes.backdrop} open={status}>
            <Loader type="TailSpin" color="#f0f0f0" height={85} width={85} />
        </Backdrop>
    );
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

function TopicI({ classes, func, status }) {
    return (
        <>
            <Box pt={0} pb={0} className={classes.displayflexHead}>
                <Box className={classes.displayflexHead}>
                    <Person />
                    <Typography className={classes.font_header}>ประวัติผู้โดยสาร</Typography>
                </Box>
                <Box>
                    <Button
                        className={classes.font_normal}
                        onClick={func}
                        disabled={status}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        รายชื่อผู้โดยสาร
                    </Button>
                </Box>
            </Box>
            <PageLine />
        </>
    );
}

function TopicII({ classes }) {
    return (
        <>
            <Box pt={2} pb={2}>
                <Box className={classes.displayflex}>
                    <Person />
                    <Typography className={classes.font_header}>ข้อมูลเพื่อบริการพิเศษที่ถูกใจผู้โดยสาร (เป็นทางเลือก)</Typography>
                </Box>
                <PageLine />
            </Box>

        </>
    );
}

function HeadersI({ classes, func, status, }) {
    return (
        <>
            <Box pt={0} pb={0}>
                <Box className={classes.displayflex}>
                    <Assignment fontSize="small" />
                    <Typography className={classes.font_subheader}>&nbsp;ข้อมูลส่วนตัว *&nbsp;

                        {/* <Button variant="contained"
                            disabled={status}
                            onClick={func}
                            size="small"
                            color="primary"
                            className={classes.font_smaller}
                        >ตามบัญชีใช้งาน</Button>  * */}
                    </Typography>
                    <Typography disabled={status} onClick={func} className={classes.font_usage}>ตามบัญชีใช้งาน</Typography>
                </Box>
                <PageLine />
            </Box>

        </>
    );
}

function HeadersII({ classes }) {
    return (
        <>
            <Box pt={0} pb={0}>
                <Box className={classes.displayflex}>
                    {/* <Favorite fontSize="small" /> */}
                    <img src="/image/stethoscope.png" height="28" width="28" />
                    <Typography className={classes.font_subheader}>&nbsp;โรคประจำตัว (เลือกได้มากกว่า 1 ข้อ) *</Typography>
                </Box>
                <PageLine />
            </Box>

        </>
    );
}

function HeadersIII({ classes }) {
    return (
        <>
            <Box pt={0} pb={0}>
                <Box className={classes.displayflex}>
                    <DirectionsWalk />
                    <Typography className={classes.font_subheader}> ความสามารถในการเดิน *</Typography>
                </Box>
                <PageLine />
            </Box>

        </>
    );
}

function HeadersIV({ classes }) {
    return (
        <>
            <Box pt={0} pb={0}>
                <Box className={classes.displayflex}>
                    <img src="/image/helper.png" height="24" width="24" />
                    <Typography className={classes.font_subheader}>&nbsp;ความต้องการให้ผู้บริการช่วยพยุง/ประคอง *</Typography>
                </Box>
                <PageLine />
            </Box>
        </>
    );
}

function HeadersV({ classes }) {
    return (
        <>
            <Box pt={0} pb={0}>
                <Box className={classes.displayflex}>
                    <Assignment />
                    <Typography className={classes.font_subheader}>&nbsp;ความสนใจ (เลือกได้มากกว่า 1 ข้อ) </Typography>
                </Box>
                <PageLine />
            </Box>

        </>
    );
}

function HeadersVI({ classes }) {
    return (
        <>
            <Box pt={0} pb={0}>
                <Box className={classes.displayflex}>
                    <RecordVoiceOver />
                    <Typography className={classes.font_subheader}>&nbsp;คำที่ต้องการให้ใช้เรียกแทนชื่อ (ถ้ามี)</Typography>
                </Box>
                <PageLine />
            </Box>

        </>
    );
}

function HeadersVII({ classes }) {
    return (
        <>
            <Box pt={0} pb={0}>
                <Box className={classes.displayflex}>
                    <LibraryMusic />
                    <Typography className={classes.font_subheader}>&nbsp;ประเภทเพลงที่ชื่นชอบ</Typography>
                </Box>
                <PageLine />
            </Box>

        </>
    );
}

function HeadersVIII({ classes }) {
    return (
        <>
            <Box pt={0} pb={0}>
                <Box className={classes.displayflex}>
                    <Cake />
                    <Typography className={classes.font_subheader}>&nbsp;วัน-เดือนเกิด</Typography>
                </Box>
                <PageLine />
            </Box>

        </>
    );
}

function HeadersIX({ classes }) {
    return (
        <>
            <Box pt={0} pb={1}>
                <Box className={classes.displayflex}>
                    <Chat />
                    <Typography className={classes.font_subheader}>&nbsp;ข้อมูลอื่นๆ ที่ต้องการแจ้งให้ผู้บริการทราบ</Typography>
                </Box>
                <PageLine />
            </Box>
        </>
    );
}

function HeadersIIX({ classes }) {
    return (
        <>
            <Box pt={0} pb={1}>
                <Box className={classes.displayflex}>
                    <PhotoCamera />
                    <Typography className={classes.font_subheader}>&nbsp;ต้องการให้ถ่ายภาพผู้โดยสารส่งให้ผู้จองระหว่างการเดินทางหรือไม่ ? *</Typography>
                </Box>
                <PageLine />
            </Box>
        </>
    );
}
//- Submit
function ButtonSubmit({ classes, status }) {
    return (
        <>
            <Box mt={4} mb={2} className={classes.Submit}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={status}
                    className={classes.font_normal}
                    startIcon={<Save />}
                >
                    บันทึก
                </Button>
            </Box>
        </>
    )
}


const myVar = {
    id: '',
    fname: '',
    lname: '',
    sex: null,
    weight: '',
    height: '',
    age: null,
    tel: '',
    disease_question: '2',
    walk_question: '1',
    cg_question: '1',
    hobby_question: '2',
    camera_question: '1',
    disease_json: '', // โรคประจำตัว
    disease_other: '', // กรณีเลือกอื่นๆ
    hobby_json: null, // งานอดิเรก / ความสนใจ
    hobby_other: '', // กรณีเลือกอื่นๆ
    Message: '', //คำที่ต้องการให้ใช้เรียกแทนชื่อ
    music_json: null, // music json
    music_other: '', // กรณีเลือกอื่นๆ
    day: null, // วันเกิด
    month: null, // เดือนเกิด
    note: '', // รายละเอียดเพิ่มเติม

    errorTel: {
        status: false,
        message: '',
    },
    errorDisease: {
        message: '',
        status: false
    }
}

export default function CustPassenger() {
    const url = config.API_URL + "models/Customer/Customer_profile.php";
    const classes = useStyles();
    const user = useSelector(({ PromiseReducer }) => PromiseReducer);
    const { vision, uid, pid } = useParams();
    const DiseaseRef = useRef(null);
    const telRef = useRef(null);
    const ageRef = useRef(null);
    const state = useHistory();
    const [promise, setPromise] = useState(false)
    const [isLoading, setBoolean] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [Form, setForm] = useState(myVar);
    const [msgCount, setMsgCount] = useState(0);
    //Data Masters
    const [sex, setSex] = useState([]);
    const [number, setNumbers] = useState([]);
    const [month, setMonths] = useState([]);
    const [music, setMusics] = useState([]);
    const [hobby, setHobbys] = useState([]);
    const [disease, setDisease] = useState([]);
    const [cg_question, setCg_question] = useState([]);
    const [walk_question, setWalk_question] = useState([]);
    const [camera_question, setCamera_question] = useState([]);
    const [disease_question, setDisease_question] = useState([]);


    const [search, SetSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState(''); // ให้มาถึง sort ตัวไหนก่อน
    const [datatable, setData] = useState([]);
    const [year, setYear] = useState([]);

    const headCells = [
        { id: 'id', label: '#', width: '10%', align: "center" },
        { id: 'gmm_passenger_fullname', label: 'ชื่อ - นามสกุล', width: '80%', align: "left" },
        { id: 'edit', label: '', width: '5%', align: "center" },
        { id: 'delete', label: '', width: '5%', align: "center" },
    ];

    useEffect(() => {
        FirstLoad(pid);

        (vision === 'w') ? setPromise(false) : setPromise(true);
    }, []);

    async function FirstLoad(pid) {

        setBoolean(true);
        //--------------------------------
        const payload = JSON.stringify({
            key: "Load_passenger_master",
            id: pid
        });

        const response = await fetch(url, { method: "POST", body: payload });
        await sleep(350);
        const res = await response.json();
        if (res.status) {
            if (res.data.length !== 0) {
                setForm(res.data);
                setMsgCount(res.data.note.length);

            }

            setYear(res.year)
            setSex(res.sex)
            setNumbers(res.number)
            setMonths(res.month)
            setMusics(res.music)
            setHobbys(res.hobby)
            setDisease(res.disease)
            setWalk_question(res.walk)
            setCg_question(res.question2)
            setCamera_question(res.question2)
            setDisease_question(res.question1)
            setBoolean(false);

        }

    }

    async function modal_passenger() {

        setBoolean(true);
        //--------------------------------
        const payload = JSON.stringify({
            key: "modal_passenger",
            id: uid,
        });

        const response = await fetch(url, { method: "POST", body: payload });
        await sleep(350);
        const res = await response.json();
        if (res.status) {
            setOpen(true)
            setData(res.data)
            setBoolean(false);
        }

    }

    async function SaveData(status) {
        setBoolean(true);
        //--------------------------------
        const payload = JSON.stringify({
            key: "Create_passenger",
            id: uid,
            edit_id: user.id != "" ? user.id : getLocalStorage().id,
            item: Form,
            hobby_status: status
        });

        const response = await fetch(url, { method: "POST", body: payload });
        await sleep(350);
        const res = await response.json();
        if (res.status) {

            Swal.fire({
                title: "เรียบร้อย",
                text: res.message,
                icon: "success",
            })

            if (res.message === 'อัพเดทข้อมูลสำเร็จ') {
                setBoolean(false);
                state.push('/Home/CustPassenger/' + vision + '/' + uid + '/create');
                FirstLoad('create');
                Reload();
            } else {
                setBoolean(false);
                setHobbys([])
                Reload();
            }


        }

    }

    async function delete_passenger(pid) {
        setOpen(false);
        setBoolean(true);
        //--------------------------------
        const payload = JSON.stringify({
            key: "delete_passenger",
            edit_id: user.id != "" ? user.id : getLocalStorage().id,
            pid: pid,
            uid: uid
        });

        const response = await fetch(url, { method: "POST", body: payload });
        await sleep(350);
        const res = await response.json();
        if (res.status) {
            setBoolean(false);
            Swal.fire({
                title: "เรียบร้อย",
                text: "ลบข้อมูลสำเร็จ",
                icon: "success",
            }).then(() => {
                state.push('/Home/CustPassenger/' + vision + '/' + uid + '/create');
                FirstLoad('create');
                Reload();
            })

        } else {
            setBoolean(false);
            alert_message('ข้อมูลถูกใช้อยู่ในระบบ');
        }
    }

    async function Profile_user() {
        //--------------------------------
        const payload = JSON.stringify({
            key: "Load_profile_user",
            id: uid
        });

        const response = await fetch(url, { method: "POST", body: payload });
        await sleep(350);
        const res = await response.json();
        if (res.status) {
            setForm({ ...Form, fname: res.data['fname'], lname: res.data['lname'], sex: res.data['sex'], tel: res.data['tel'] })
        }

    }

    const Reload = () => {
        setForm({
            ...Form,
            id: '',
            fname: '',
            lname: '',
            sex: null,
            weight: '',
            height: '',
            age: null,
            tel: '',
            disease_question: '2',
            walk_question: '1',
            cg_question: '1',
            camera_question: '1',
            disease_json: '', // โรคประจำตัว
            disease_other: '', // กรณีเลือกอื่นๆ
            hobby_json: null, // งานอดิเรก / ความสนใจ
            hobby_other: '', // กรณีเลือกอื่นๆ
            Message: '', //คำที่ต้องการให้ใช้เรียกแทนชื่อ
            music_json: null, // music json
            music_other: '', // กรณีเลือกอื่นๆ
            day: null, // วันเกิด
            month: null, // เดือนเกิด
            note: '', // รายละเอียดเพิ่มเติม
            errorDisease: {
                message: '',
                status: false
            }
        })

    }

    const alert_message = (txt) => {
        Swal.fire({
            title: "แจ้งเตือน",
            text: txt,
            icon: "warning",
        })
    }

    const getLocalStorage = () => {
        return JSON.parse(localStorage.cnf_us);
    };

    const filtered = datatable.filter((row) => {
        return row.gmm_passenger_fullname.toLowerCase().includes(search.toLowerCase())
    })

    const handleProfile = () => {
        Profile_user();
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleAge = (event, item) => {
        setForm({ ...Form, age: item })
    }

    const handleSex = (event, item) => {
        setForm({ ...Form, sex: item })
    }

    const maxYear = new Date().getFullYear() + 543;
    const minYear = new Date().getFullYear() + 543 - 105;

    const handleChangeInput = (event) => {
        const { target } = event;
        const { name } = target;
        if (name === "wi") {
            const isNumber = numberFormat(target.value)
            if (isNumber !== undefined) {
                setForm({ ...Form, weight: isNumber })
            }
        } else if (name === "hi") {
            const formattedValue = (Number(target.value.replace(/\D/g, '')) || '').toLocaleString();
            setForm({ ...Form, height: formattedValue });
        } else if (name === "fn") {
            setForm({ ...Form, fname: target.value });
        } else if (name === "ln") {
            setForm({ ...Form, lname: target.value });
        } else if (name === "tl") {
            if (target.value.match("^[0-9]*$")) {
                if (target.value.length === 0) {
                    setForm({
                        ...Form,
                        tel: target.value,
                        errorTel: { message: "", status: false },
                    });
                } else {
                    const fix_number = target.value.substr(0, 2);
                    if (fix_number !== "02" && fix_number !== "06" && fix_number !== "08" && fix_number !== "09") {

                        setForm({
                            ...Form,
                            tel: target.value,
                            errorTel: {
                                message: "หมวดหมายเลขโทรศัพท์ ไม่ถูกต้อง",
                                status: true,
                            },

                        });
                    } else {
                        if (fix_number === "06" || fix_number === "08" || fix_number === "09") {
                            if (target.value.length == 10) {
                                setForm({
                                    ...Form,
                                    tel: target.value,
                                    errorTel: { message: "", status: false },
                                });
                            } else {
                                setForm({
                                    ...Form,
                                    tel: target.value,
                                    errorTel: { message: "หมายเลขโทรศัพท์จำนวน 10 หลัก", status: true },
                                });
                            }
                        } else {
                            if (fix_number === "02") {
                                if (target.value.length == 9) {
                                    setForm({
                                        ...Form,
                                        tel: target.value,
                                        errorTel: { message: "", status: false },
                                    });

                                } else {
                                    setForm({
                                        ...Form,
                                        tel: target.value,
                                        errorTel: {
                                            message: "หมายเลขโทรศัพท์จำนวน 9 หลัก",
                                            status: true,
                                        },

                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const handleDelete = (row) => {
        Swal.fire({
            title: "ลบ",
            text: "ท่านต้องการลบข้อมูล หรือไม่?",
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก",
            //reverseButtons: true,
        }).then((output) => {
            if (output.isConfirmed) {
                delete_passenger(row.gmm_passenger_id);
            }
        });

    }

    const handleEdit = (row) => {
        state.push('/Home/CustPassenger/' + vision + '/' + uid + '/' + row.gmm_passenger_id);
        FirstLoad(row.gmm_passenger_id);
        Reload();
        setOpen(false)
    }

    //----------------------------------

    const numberFormat = (value) => {
        if (value.length === 1 && value === '.') {
            return undefined;
        } else {
            if (value.match("^[0-9.]*$")) {
                if (value.match("^[0-9]*(\.[0-9]?)?$")) {
                    return value;
                }
            }
        }
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        modal_passenger();
    }

    const handleDisease = index => event => {
        let count_Disease = 0;
        let check = false;
        let group = false;
        let newArr = [...disease];
        newArr[index]['status'] = event.target.checked;
        setDisease(newArr);

        disease.filter((list, indx) => {
            if (list.status == false) {
                count_Disease++;
            } else if (list.status == true && indx == 7) {
                check = true
            }
        })

        if (disease.length !== count_Disease) {
            newArr[7]['group'].find((list) => {
                if (list.status == true) {
                    group = true;
                }
            })

            if (group) {
                if (disease[index].gmm_disease_id === '11') {
                    setForm({ ...Form, disease_other: '', disease_json: newArr, errorDisease: { message: '', status: false } });
                } else {
                    setForm({ ...Form, disease_json: newArr, errorDisease: { message: '', status: false } });
                }

            } else {
                if (check) {
                    if (disease[index].gmm_disease_id === '11') {
                        setForm({ ...Form, disease_other: '', disease_json: newArr, errorDisease: { message: 'กรุณาเลือกหัวข้อย้อย (ซีกซ้าย , ซีกขวา)', status: true } });
                    } else {
                        setForm({ ...Form, disease_json: newArr, errorDisease: { message: 'กรุณาเลือกหัวข้อย้อย (ซีกซ้าย , ซีกขวา)', status: true } });
                    }
                } else {
                    if (disease[index].gmm_disease_id === '11') {
                        setForm({ ...Form, disease_other: '', disease_json: newArr, errorDisease: { message: '', status: false } });
                    } else {
                        setForm({ ...Form, disease_json: newArr, errorDisease: { message: '', status: false } });
                    }
                }
            }
        } else {
            setForm({ ...Form, disease_other: '', disease_json: newArr, errorDisease: { message: 'กรุณาเลือก (อย่างน้อย 1 รายการ)', status: true } });
        }


        if ((index + 1) === 8 && event.target.checked == false) {
            newArr[index]['group'].filter((list, key) => {
                if (list.status == true) {
                    newArr[index]['group'][key]['status'] = !list.status
                    setDisease(newArr);
                }
            })
        }


    };

    const handleTypeDisease = (index, indexSec, event) => {
        let check = false;
        let newArr = [...disease];
        newArr[index]['group'][indexSec]['status'] = event.target.checked;
        setDisease(newArr);

        newArr[index]['group'].find((list, indx) => {
            if (list.status == true) {
                check = true;
            }
        })

        if (check) {
            setForm({ ...Form, disease_json: newArr, errorDisease: { message: '', status: false } });
        } else {
            setForm({ ...Form, disease_json: newArr, errorDisease: { message: 'กรุณาเลือกหัวข้อย้อย (ซีกซ้าย , ซีกขวา)', status: true } });
        }

    };

    const handleHobby = index => event => {
        let count_hobby = 0;
        let newArr = [...hobby];
        newArr[index]['status'] = event.target.checked;
        setHobbys(newArr);

        hobby.filter((list, index) => {
            if (list.status == false) {
                count_hobby++;
            }

            if (hobby.length !== count_hobby) {
                setForm({ ...Form, hobby_json: newArr });
            } else {
                setForm({ ...Form, hobby_json: newArr, hobby_other: '' });
            }
        })

        if (hobby[index].gmm_hobby_id === '10') {
            setForm({ ...Form, hobby_json: newArr, hobby_other: '' });
        }

    };

    const handleDisease_question = (event) => {
        if (event.target.value === '2') {
            let newArr = [...disease];
            //-----------------------------------
            disease.filter((list, index) => {
                if (list.status == true) {
                    newArr[index]['status'] = !list.status
                    if (newArr[index]['id'] === '8') {
                        newArr[index]['group'][0]['status'] = false
                        newArr[index]['group'][1]['status'] = false
                    }
                    setDisease(newArr);
                }
            })

            setForm({ ...Form, disease_other: '', disease_json: '', disease_question: event.target.value, errorDisease: { message: '', status: false } });
        } else {
            setForm({ ...Form, disease_question: event.target.value, errorDisease: { message: 'กรุณาเลือก (อย่างน้อย 1 รายการ)', status: true } });
        }
    }


    const handleMusic = (event, item) => {
        setForm({ ...Form, music_json: item })
    };

    const handleDay = (event, item) => {
        setForm({ ...Form, day: item })
    }

    const handleMonth = (event, item) => {
        setForm({ ...Form, month: item })
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const Submit = (event) => {
        event.preventDefault();
        if (Form.errorDisease.status === false && Form.errorTel.status === false) {
            let count_plus = 0;

            Swal.fire({
                title: "บันทึก",
                text: "ท่านต้องการบันทึกข้อมูล หรือไม่?",
                icon: "info",
                showCancelButton: true,
                confirmButtonText: "ตกลง",
                cancelButtonText: "ยกเลิก",
                //reverseButtons: true,
            }).then((output) => {
                if (output.isConfirmed) {

                    for (let i = 0; i < hobby.length; i++) {
                        if (hobby[i].status === false) {
                            count_plus++;
                        }
                    }

                    if (count_plus === hobby.length) {
                        SaveData('2');
                    } else {
                        SaveData('1');
                    }

                }
            });
        } else {
            if (Form.errorTel.status) {
                telRef.current.focus();
            } else if (Form.errorDisease.status) {
                DiseaseRef.current.focus();
            }


        }
    }

    function descendingComparator(a, b, orderBy) {
        if (typeof a[orderBy] === 'object') {
            if (b[orderBy].id < a[orderBy].id) {
                return -1;
            }
            if (b[orderBy].id > a[orderBy].id) {
                return 1;
            }
            return 0;
        } else {
            if (b[orderBy] < a[orderBy]) {
                return -1;
            }
            if (b[orderBy] > a[orderBy]) {
                return 1;
            }
            return 0;
        }


    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);

        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function EnhancedTableHead(props) {
        const { classes, order, orderBy, onRequestSort } = props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <StyledTableRow>

                    {headCells.map((headCell) => (
                        <StyledTableCell
                            key={headCell.id}
                            width={headCell.width}
                            align={headCell.align}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                                hideSortIcon={true}
                                disabled={headCell.id === 'active' || headCell.id === 'passenger'}

                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </StyledTableCell>
                    ))}
                </StyledTableRow>
            </TableHead>
        );
    }

    function TablePaginationActions(props) {
        const theme = useTheme();
        const { count, page, rowsPerPage, onChangePage } = props;

        const handleFirstPageButtonClick = (event) => {
            onChangePage(event, 0);
        };

        const handleBackButtonClick = (event) => {
            onChangePage(event, page - 1);
        };

        const handleNextButtonClick = (event) => {
            onChangePage(event, page + 1);
        };

        const handleLastPageButtonClick = (event) => {
            onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <div className={classes.Pagination}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
                </IconButton>
                <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
                </IconButton>
            </div>
        );
    }


    function ViewTable({ filtered }) {
        return (
            <>
                <Box mt={2} />
                <TableContainer component={Paper}>
                    <Table aria-label="custom pagination table">
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {(rowsPerPage > 0
                                ? stableSort(filtered, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : stableSort(filtered, getComparator(order, orderBy))).map((row, index) => (
                                    <StyledTableRow hover key={index}>
                                        <StyledTableCell width='10%' align="center">
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell width='80%' align="left">
                                            {row.gmm_passenger_fullname}
                                        </StyledTableCell>
                                        <StyledTableCell width='5%' align="center" className={classes.padding_table} onClick={() => { handleEdit(row) }}>
                                            <IconButton title="แก้ไขข้อมูล" color='primary' >
                                                <Edit fontSize="small" />
                                            </IconButton>
                                        </StyledTableCell>
                                        <StyledTableCell width='5%' align="center" className={classes.padding_table} onClick={() => { handleDelete(row) }}>
                                            <IconButton title="ลบข้อมูล" color='secondary' >
                                                <Close fontSize="small" />
                                            </IconButton>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}

                            {filtered.length === 0 && (
                                <StyledTableRow style={{ height: 25 }}>
                                    <StyledTableCell colSpan={4} align="center">
                                        ไม่พบข้อมูล
                                    </StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={4}
                                    count={filtered.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: { 'aria-label': 'rows per page' },
                                        native: true,
                                    }}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            </>
        )
    }



    return (
        <>
            <form onSubmit={Submit}>
                <Loading classes={classes} status={isLoading} />
                <TopicI classes={classes} func={handleOpen} status={promise} />
                <Box mt={2} />
                <Card variant="outlined">
                    <CardContent style={{ paddingBottom: '16px' }}>
                        <FormControl component="fieldset">
                            <FormLabel className={classes.font_normal} ><HeadersI classes={classes} func={handleProfile} status={promise} /></FormLabel>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        name="fn"
                                        label="ชื่อ"
                                        value={Form.fname}
                                        onChange={handleChangeInput}
                                        margin="dense"
                                        variant="outlined"
                                        autoComplete="off"
                                        inputProps={{ maxLength: 80, className: classes.font_normal, }}
                                        InputProps={{
                                            className: classes.font_normal,
                                        }}
                                        InputLabelProps={{
                                            className: classes.font_normal,
                                        }}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        name="ln"
                                        label="นามสกุล"
                                        value={Form.lname}
                                        onChange={handleChangeInput}
                                        margin="dense"
                                        variant="outlined"
                                        autoComplete="off"
                                        inputProps={{ maxLength: 80, className: classes.font_normal, }}
                                        InputProps={{
                                            className: classes.font_normal,
                                        }}
                                        InputLabelProps={{
                                            className: classes.font_normal,
                                        }}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        value={Form.tel}
                                        onChange={handleChangeInput}
                                        name="tl"
                                        label="เบอร์โทรศัพท์"
                                        margin="dense"
                                        variant="outlined"
                                        autoComplete="off"
                                        inputRef={telRef}
                                        error={Form.errorTel.status}
                                        helperText={Form.errorTel.message}
                                        inputProps={{ maxLength: 10, className: classes.font_normal, }}
                                        InputProps={{
                                            className: classes.font_normal,
                                        }}
                                        InputLabelProps={{
                                            className: classes.font_normal,

                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Autocomplete
                                        classes={{
                                            input: classes.font_normal,
                                            option: classes.font_normal,
                                        }}
                                        options={sex}
                                        getOptionLabel={(value) => value.gmm_sex_name}
                                        getOptionSelected={(option, value) =>
                                            option.gmm_sex_id === value.gmm_sex_id
                                        }
                                        value={Form.sex}
                                        onChange={handleSex}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="เพศ"
                                                margin="dense"
                                                variant="outlined"
                                                InputLabelProps={{
                                                    className: classes.font_normal,
                                                }}
                                                required
                                            />
                                        )}

                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        name="wi"
                                        label="น้ำหนัก"
                                        value={Form.weight}
                                        onChange={handleChangeInput}
                                        margin="dense"
                                        variant="outlined"
                                        autoComplete="off"
                                        inputProps={{ maxLength: 5 }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <Typography className={classes.font_normal}>กก. </Typography>
                                                </InputAdornment>
                                            ),
                                            className: classes.font_normal,
                                        }}
                                        InputLabelProps={{ className: classes.font_normal }}
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <TextField
                                        name="hi"
                                        label="ส่วนสูง"
                                        value={Form.height}
                                        onChange={handleChangeInput}
                                        margin="dense"
                                        variant="outlined"
                                        autoComplete="off"
                                        inputProps={{ maxLength: 3 }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <Typography className={classes.font_normal}>ซม. </Typography>
                                                </InputAdornment>
                                            ),
                                            className: classes.font_normal,
                                        }}
                                        InputLabelProps={{ className: classes.font_normal }}
                                        fullWidth
                                        required
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <Autocomplete
                                        classes={{
                                            input: classes.font_normal,
                                            option: classes.font_normal,
                                        }}
                                        options={year}
                                        getOptionLabel={(value) => value.year}
                                        getOptionSelected={(option, value) =>
                                            option.year === value.year
                                        }
                                        value={Form.age}
                                        onChange={handleAge}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="ปีเกิด พ.ศ."
                                                margin="dense"
                                                variant="outlined"
                                                InputLabelProps={{
                                                    className: classes.font_normal,
                                                }}
                                                required
                                            />
                                        )}
                                    />



                                </Grid>

                            </Grid>
                        </FormControl>
                    </CardContent>
                </Card>
                <Box mt={2}>
                    <Card variant="outlined" >
                        <CardContent style={{ paddingBottom: '16px' }}>
                            <FormControl>
                                <FormLabel className={classes.font_normal} ><HeadersII classes={classes} /></FormLabel>
                                <RadioGroup row aria-label="position" value={Form.disease_question} onChange={handleDisease_question} defaultValue="top">
                                    {disease_question.map((ans) =>
                                        <FormControlLabel key={ans.gmm_question_id} value={ans.gmm_question_id}
                                            inputRef={DiseaseRef}
                                            classes={{ label: classes.font_normal }}
                                            control={<Radio color="primary" />}
                                            label={ans.gmm_question_name} >
                                        </FormControlLabel>
                                    )}
                                </RadioGroup>
                            </FormControl>
                            {Form.disease_question === '1' && (
                                <Box pt={2} pb={1}>
                                    <Card variant="outlined">
                                        <CardContent style={{ paddingBottom: '16px' }}>
                                            <FormControl component="fieldset" error={Form.errorDisease.status} className={classes.font_normal}>
                                                <FormGroup>
                                                    {disease.map((disease, index) =>
                                                        <Box key={disease.gmm_disease_id} className={classes.displayflex}>
                                                            <FormControlLabel
                                                                classes={{ label: classes.font_normal }}
                                                                control={<Checkbox color="primary" checked={disease.status}
                                                                    onChange={handleDisease(index)}
                                                                    name={disease.gmm_disease_id} />}
                                                                label={disease.gmm_disease_name}
                                                                size="small"
                                                            />
                                                            {disease.gmm_disease_id == '8' && disease.status == true &&
                                                                <>
                                                                    {disease.group.map((item, indexSec) =>
                                                                        <Box key={item.gmm_disease_id}>
                                                                            <FormControlLabel
                                                                                classes={{ label: classes.font_normal }}
                                                                                control={<Checkbox color="primary" checked={item.status}
                                                                                    onChange={(event) => handleTypeDisease(index, indexSec, event)}
                                                                                    name={item.gmm_disease_id} />}
                                                                                label={item.gmm_disease_desc}
                                                                                size="small"
                                                                            />
                                                                        </Box>
                                                                    )}
                                                                </>
                                                            }
                                                            {disease.gmm_disease_id == '11' && disease.status == true &&
                                                                <Box>
                                                                    <TextField
                                                                        value={Form.disease_other}
                                                                        onChange={(event) => { setForm({ ...Form, disease_other: event.target.value }) }}
                                                                        margin="dense"
                                                                        variant="outlined"
                                                                        placeholder="โปรดระบุ"
                                                                        inputProps={{ maxLength: 80, className: classes.font_normal, }}
                                                                        InputProps={{
                                                                            className: classes.font_normal,
                                                                        }}
                                                                        InputLabelProps={{
                                                                            className: classes.font_normal,
                                                                        }}
                                                                        fullWidth
                                                                    />
                                                                </Box>
                                                            }
                                                        </Box>
                                                    )}
                                                    <FormHelperText className={classes.font_normal}>{Form.errorDisease.message}</FormHelperText>
                                                </FormGroup>
                                            </FormControl>
                                        </CardContent>
                                    </Card>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Box>
                <Box mt={2}>
                    <Card variant="outlined">
                        <CardContent style={{ paddingBottom: '16px' }}>
                            <FormControl component="fieldset">
                                <FormLabel className={classes.font_normal} ><HeadersIII classes={classes} /></FormLabel>
                                <RadioGroup onChange={(event) => { setForm({ ...Form, walk_question: event.target.value }) }} value={Form.walk_question} required>
                                    {walk_question.map((walk) =>
                                        <FormControlLabel key={walk.gmm_walk_id} value={walk.gmm_walk_id}
                                            classes={{ label: classes.font_normal }}
                                            control={<Radio color="primary" />}
                                            label={walk.gmm_walk_name}
                                            required >
                                        </FormControlLabel>
                                    )}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Box>
                <Box mt={2}>
                    <Card variant="outlined">
                        <CardContent style={{ paddingBottom: '16px' }}>
                            <FormControl>
                                <FormLabel className={classes.font_normal} ><HeadersIV classes={classes} /></FormLabel>
                                <RadioGroup row aria-label="position" value={Form.cg_question} onChange={(event) => { setForm({ ...Form, cg_question: event.target.value }) }} defaultValue="top">
                                    {cg_question.map((ans) =>
                                        <FormControlLabel key={ans.gmm_question_id} value={ans.gmm_question_id}
                                            classes={{ label: classes.font_normal }}
                                            control={<Radio color="primary" />}
                                            label={ans.gmm_question_name} >
                                        </FormControlLabel>
                                    )}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Box>
                <Box mt={2}>
                    <Card variant="outlined">
                        <CardContent style={{ paddingBottom: '16px' }}>
                            <FormControl component="fieldset">
                                <FormLabel className={classes.font_normal} ><HeadersIIX classes={classes} /></FormLabel>
                                <RadioGroup onChange={(event) => { setForm({ ...Form, camera_question: event.target.value }) }} value={Form.camera_question} required>
                                    {camera_question.map((camera) =>
                                        <FormControlLabel key={camera.gmm_question_id} value={camera.gmm_question_id}
                                            classes={{ label: classes.font_normal }}
                                            control={<Radio color="primary" />}
                                            label={camera.gmm_question_name}
                                            required >
                                        </FormControlLabel>
                                    )}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Box>
                <Box mt={2}>
                    <Card variant="outlined">
                        <CardContent style={{ paddingBottom: '16px' }}>
                            <FormControl component="fieldset">
                                <FormLabel className={classes.font_normal} ><HeadersIX classes={classes} /></FormLabel>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            value={Form.note}
                                            onChange={(event) => {
                                                setForm({ ...Form, note: event.target.value });
                                                setMsgCount(event.target.value.length);
                                            }}
                                            placeholder="รายละเอียดเพิ่มเติม"
                                            variant="outlined"
                                            rows={3}
                                            inputProps={{ maxLength: 256, className: classes.font_normal, }}
                                            InputProps={{
                                                className: classes.font_normal,
                                            }}
                                            InputLabelProps={{
                                                className: classes.font_normal,
                                            }}
                                            multiline
                                            fullWidth
                                        />
                                        <FormHelperText className={classes.font_small}>จำนวนตัวอักษร {msgCount} / 256</FormHelperText>
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Box>

                <TopicII classes={classes} />
                <Box>
                    <Card variant="outlined">
                        <CardContent style={{ paddingBottom: '16px' }}>
                            <FormControl component="fieldset">
                                <FormLabel className={classes.font_normal} ><HeadersVI classes={classes} /></FormLabel>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <TextField
                                            margin="dense"
                                            variant="outlined"
                                            value={Form.Message}
                                            onChange={(event) => { setForm({ ...Form, Message: event.target.value }) }}
                                            inputProps={{ maxLength: 80, className: classes.font_normal, }}
                                            InputProps={{
                                                className: classes.font_normal,
                                            }}
                                            InputLabelProps={{
                                                className: classes.font_normal,
                                            }}
                                            helperText="ตัวอย่าง เช่น ท่าน, อาม่า, คุณลุง, คุณยาย"
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Box>
                <Box mt={2}>
                    <Card variant="outlined">
                        <CardContent style={{ paddingBottom: '16px' }}>
                            <FormControl size="small" component="fieldset">
                                <FormLabel className={classes.font_normal} ><HeadersV classes={classes} /></FormLabel>
                                <Box pt={1} pb={1}>
                                    <Card variant="outlined">
                                        <CardContent style={{ paddingBottom: '16px' }}>
                                            <FormControl component="fieldset" className={classes.font_normal}>
                                                <FormGroup>
                                                    {hobby.map((hobby, index) =>
                                                        <Box key={hobby.gmm_hobby_id} className={classes.displayflex}>
                                                            <FormControlLabel
                                                                classes={{ label: classes.font_normal }}
                                                                control={<Checkbox color="primary" checked={hobby.status}
                                                                    onChange={handleHobby(index)}
                                                                    name={hobby.gmm_hobby_id} />}
                                                                label={hobby.gmm_hobby_name}
                                                                size="small"
                                                            />
                                                            {hobby.gmm_hobby_id == '10' && hobby.status == true &&
                                                                <Box>
                                                                    <TextField
                                                                        value={Form.hobby_other}
                                                                        onChange={(event) => { setForm({ ...Form, hobby_other: event.target.value }) }}
                                                                        variant="outlined"
                                                                        margin="dense"
                                                                        placeholder="โปรดระบุ"
                                                                        inputProps={{ maxLength: 80, className: classes.font_normal, }}
                                                                        InputProps={{
                                                                            className: classes.font_normal,
                                                                        }}
                                                                        InputLabelProps={{
                                                                            className: classes.font_normal,
                                                                        }}
                                                                        fullWidth
                                                                    />
                                                                </Box>
                                                            }
                                                        </Box>
                                                    )}
                                                </FormGroup>
                                            </FormControl>
                                        </CardContent>
                                    </Card>
                                </Box>
                            </FormControl>

                        </CardContent>
                    </Card>
                </Box>
                <Box mt={2}>
                    <Card variant="outlined">
                        <CardContent style={{ paddingBottom: '16px' }}>
                            <FormControl component="fieldset">
                                <FormLabel className={classes.font_normal} ><HeadersVII classes={classes} /></FormLabel>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Autocomplete
                                            classes={{
                                                input: classes.font_normal,
                                                option: classes.font_normal,
                                            }}
                                            options={music}
                                            getOptionLabel={(value) => value.gmm_music_name}
                                            getOptionSelected={(option, value) =>
                                                option.gmm_music_id === value.gmm_music_id
                                            }
                                            value={Form.music_json}
                                            onChange={handleMusic}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="ประเภท"
                                                    margin="dense"
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        className: classes.font_normal,
                                                    }}
                                                />
                                            )}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <TextField
                                            label="ระบุนักร้องโปรด / เพลง"
                                            margin="dense"
                                            variant="outlined"
                                            value={Form.music_other}
                                            onChange={(event) => {
                                                setForm({ ...Form, music_other: event.target.value })
                                            }}
                                            inputProps={{ maxLength: 80, className: classes.font_normal, }}
                                            InputProps={{
                                                className: classes.font_normal,
                                            }}
                                            InputLabelProps={{
                                                className: classes.font_normal,
                                            }}
                                            fullWidth
                                        />
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Box>
                <Box mt={2}>
                    <Card variant="outlined">
                        <CardContent style={{ paddingBottom: '16px' }}>
                            <FormControl component="fieldset">
                                <FormLabel className={classes.font_normal} ><HeadersVIII classes={classes} /></FormLabel>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Autocomplete
                                            classes={{
                                                input: classes.font_normal,
                                                option: classes.font_normal,
                                            }}
                                            options={number}
                                            getOptionLabel={(value) => value.gmm_num_id}
                                            getOptionSelected={(option, value) =>
                                                option.gmm_num_id === value.gmm_num_id
                                            }
                                            value={Form.day}
                                            onChange={handleDay}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="วันเกิด"
                                                    margin="dense"
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        className: classes.font_normal,
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Autocomplete
                                            classes={{
                                                input: classes.font_normal,
                                                option: classes.font_normal,
                                            }}
                                            options={month}
                                            getOptionLabel={(value) => value.gmm_month_name}
                                            getOptionSelected={(option, value) =>
                                                option.gmm_month_id === value.gmm_month_id
                                            }
                                            value={Form.month}
                                            onChange={handleMonth}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="เดือนเกิด"
                                                    margin="dense"
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        className: classes.font_normal,
                                                    }}
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </FormControl>
                        </CardContent>
                    </Card>
                </Box>

                <Grid item xs={12}>
                    <ButtonSubmit classes={classes} status={promise} />
                </Grid>
            </form>

            <Dialog
                onClose={handleClose}
                maxWidth="md"
                aria-labelledby="customized-dialog-title"
                open={open}>
                <MuiDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    รายชื่อผู้โดยสาร
                </MuiDialogTitle>
                <MuiDialogContent dividers>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <TextField
                                margin="dense"
                                variant="outlined"
                                placeholder="ค้นหารายชื่อ..."
                                onChange={(e) => SetSearch(e.target.value)}
                                InputProps={{
                                    className: classes.font_normal,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search fontSize="small" className={classes.IconSearch} />
                                        </InputAdornment>
                                    ),
                                }}
                                InputLabelProps={{
                                    className: classes.font_normal,
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ViewTable filtered={filtered} />
                        </Grid>
                    </Grid>
                </MuiDialogContent>
            </Dialog>
        </>
    );
}







