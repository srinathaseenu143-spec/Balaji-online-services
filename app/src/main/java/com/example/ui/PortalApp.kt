package com.example.ui

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.widget.Toast
import androidx.compose.animation.*
import androidx.compose.foundation.BorderStroke
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.items
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.data.DraftEntity
import com.example.ui.theme.AccentGold
import com.example.ui.theme.GovBlueDark
import com.example.ui.theme.GovBlueMedium
import com.example.ui.theme.ToolGreen
import com.example.viewmodel.MainViewModel
import java.text.SimpleDateFormat
import java.util.*

sealed class Screen {
    object Dashboard : Screen()
    data class ServicesList(val category: String) : Screen() // "gov" or "digital"
    data class DraftForm(val serviceName: String) : Screen()
    data class DraftDetail(val draftId: Int) : Screen()
    object History : Screen()
}

// Data models for the services
data class ServiceItem(val name: String, val icon: ImageVector)

val govServices = listOf(
    ServiceItem("Aadhaar: Address Update", Icons.Default.Badge),
    ServiceItem("Aadhaar: DOB/Profile Correction", Icons.Default.ManageAccounts),
    ServiceItem("PAN: New Registration", Icons.Default.CreditCard),
    ServiceItem("PAN: Data Correction", Icons.Default.Edit),
    ServiceItem("Voter ID: New Application", Icons.Default.HowToReg),
    ServiceItem("Voter ID: Correction", Icons.Default.PersonSearch),
    ServiceItem("Caste & Income Certificate", Icons.Default.Description),
    ServiceItem("Birth Certificate", Icons.Default.ChildCare),
    ServiceItem("RTC (Pahani) Download", Icons.Default.Landscape),
    ServiceItem("ServicePlus Applications", Icons.Default.AddTask),
    ServiceItem("Scheme: Gruhalakshmi", Icons.Default.Woman),
    ServiceItem("Scheme: Yuva Nidhi / Gruha Jyothi", Icons.Default.Lightbulb),
    ServiceItem("Ayushman Bharat Health Card", Icons.Default.HealthAndSafety),
    ServiceItem("Driving License / LL Renewal", Icons.Default.LocalTaxi),
    ServiceItem("Vehicle Insurance Renewal", Icons.Default.VerifiedUser)
)

val digitalTools = listOf(
    ServiceItem("Passport Photo Prep", Icons.Default.PhotoCamera),
    ServiceItem("Background Removal", Icons.Default.AutoFixHigh),
    ServiceItem("Image Compression (PNG/JPG)", Icons.Default.Compress),
    ServiceItem("PDF Editing & Merging", Icons.Default.PictureAsPdf),
    ServiceItem("Professional Invoice Generator", Icons.Default.ReceiptLong),
    ServiceItem("ATS Resume Maker (Fresher)", Icons.Default.Description),
    ServiceItem("ATS Resume Maker (Pro)", Icons.Default.WorkHistory),
    ServiceItem("Latest Job Updates/Mock Tests", Icons.Default.School),
    ServiceItem("Marriage Biodata Creation", Icons.Default.Favorite),
    ServiceItem("QR Code Generation", Icons.Default.QrCodeScanner),
    ServiceItem("AI Indian Language Assistant", Icons.Default.Psychology)
)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PortalApp(viewModel: MainViewModel) {
    val context = LocalContext.current
    var currentScreen by remember { mutableStateOf<Screen>(Screen.Dashboard) }
    val drafts by viewModel.allDrafts.collectAsStateWithLifecycle()
    val isGenerating by viewModel.isGenerating.collectAsStateWithLifecycle()

    // Helper backstack for simple state navigation
    val screenStack = remember { mutableStateListOf<Screen>(Screen.Dashboard) }

    fun navigateTo(screen: Screen) {
        screenStack.add(screen)
        currentScreen = screen
    }

    fun navigateBack() {
        if (screenStack.size > 1) {
            screenStack.removeAt(screenStack.size - 1)
            currentScreen = screenStack.last()
        } else {
            currentScreen = Screen.Dashboard
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(8.dp),
                        modifier = Modifier.clickable {
                            screenStack.clear()
                            screenStack.add(Screen.Dashboard)
                            currentScreen = Screen.Dashboard
                        }
                    ) {
                        Icon(
                            imageVector = Icons.Default.AccountBalance,
                            contentDescription = "Court Icon",
                            tint = Color.White,
                            modifier = Modifier.size(28.dp)
                        )
                        Column {
                            Text(
                                text = "Balaji Online",
                                color = Color.White,
                                fontSize = 16.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "DIGITAL EXCELLENCE",
                                color = AccentGold,
                                fontSize = 9.sp,
                                fontWeight = FontWeight.SemiBold,
                                letterSpacing = 1.sp
                            )
                        }
                    }
                },
                actions = {
                    Box(
                        modifier = Modifier
                            .padding(end = 8.dp)
                            .border(1.dp, ToolGreen, RoundedCornerShape(12.dp))
                            .background(ToolGreen.copy(alpha = 0.15f), RoundedCornerShape(12.dp))
                            .padding(horizontal = 8.dp, vertical = 4.dp),
                        contentAlignment = Alignment.Center
                    ) {
                        Column(horizontalAlignment = Alignment.CenterHorizontally) {
                            Text(
                                text = "● CENTER OPEN",
                                color = Color.Green,
                                fontSize = 8.sp,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "9:00 AM - 9:00 PM",
                                color = Color.White,
                                fontSize = 8.sp,
                                fontWeight = FontWeight.Medium
                            )
                        }
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = GovBlueDark
                )
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = Color.White,
                tonalElevation = 8.dp
            ) {
                NavigationBarItem(
                    selected = currentScreen is Screen.Dashboard,
                    onClick = {
                        screenStack.clear()
                        navigateTo(Screen.Dashboard)
                    },
                    icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
                    label = { Text("Home", fontSize = 10.sp, fontWeight = FontWeight.Bold) },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = GovBlueDark,
                        selectedTextColor = GovBlueDark,
                        indicatorColor = GovBlueDark.copy(alpha = 0.1f)
                    )
                )
                NavigationBarItem(
                    selected = currentScreen is Screen.ServicesList && (currentScreen as Screen.ServicesList).category == "gov",
                    onClick = {
                        screenStack.clear()
                        screenStack.add(Screen.Dashboard)
                        navigateTo(Screen.ServicesList("gov"))
                    },
                    icon = { Icon(Icons.Default.AssuredWorkload, contentDescription = "Gov Services") },
                    label = { Text("Gov", fontSize = 10.sp, fontWeight = FontWeight.Bold) },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = GovBlueDark,
                        selectedTextColor = GovBlueDark,
                        indicatorColor = GovBlueDark.copy(alpha = 0.1f)
                    )
                )
                NavigationBarItem(
                    selected = currentScreen is Screen.ServicesList && (currentScreen as Screen.ServicesList).category == "digital",
                    onClick = {
                        screenStack.clear()
                        screenStack.add(Screen.Dashboard)
                        navigateTo(Screen.ServicesList("digital"))
                    },
                    icon = { Icon(Icons.Default.Construction, contentDescription = "Tools") },
                    label = { Text("Tools", fontSize = 10.sp, fontWeight = FontWeight.Bold) },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = GovBlueDark,
                        selectedTextColor = GovBlueDark,
                        indicatorColor = GovBlueDark.copy(alpha = 0.1f)
                    )
                )
                NavigationBarItem(
                    selected = currentScreen is Screen.History,
                    onClick = {
                        screenStack.clear()
                        screenStack.add(Screen.Dashboard)
                        navigateTo(Screen.History)
                    },
                    icon = { Icon(Icons.Default.History, contentDescription = "History") },
                    label = { Text("History", fontSize = 10.sp, fontWeight = FontWeight.Bold) },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = GovBlueDark,
                        selectedTextColor = GovBlueDark,
                        indicatorColor = GovBlueDark.copy(alpha = 0.1f)
                    )
                )
            }
        },
        modifier = Modifier.fillMaxSize()
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .padding(innerPadding)
                .fillMaxSize()
                .background(Color(0xFFF8F9FA))
        ) {
            AnimatedContent(
                targetState = currentScreen,
                transitionSpec = {
                    slideInHorizontally { width -> width } + fadeIn() togetherWith
                            slideOutHorizontally { width -> -width } + fadeOut()
                },
                label = "ScreenTransition"
            ) { targetScreen ->
                when (targetScreen) {
                    is Screen.Dashboard -> DashboardScreen(
                        drafts = drafts,
                        onCategorySelect = { cat -> navigateTo(Screen.ServicesList(cat)) },
                        onHistoryClick = { navigateTo(Screen.History) }
                    )
                    is Screen.ServicesList -> ServicesListScreen(
                        category = targetScreen.category,
                        onBack = { navigateBack() },
                        onServiceSelect = { service -> navigateTo(Screen.DraftForm(service)) }
                    )
                    is Screen.DraftForm -> DraftFormScreen(
                        serviceName = targetScreen.serviceName,
                        isGenerating = isGenerating,
                        onBack = { navigateBack() },
                        onGenerate = { name, lang, req ->
                            viewModel.generateDraft(
                                serviceName = targetScreen.serviceName,
                                customerName = name,
                                languagePreference = lang,
                                specificRequest = req,
                                onComplete = { entity ->
                                    navigateTo(Screen.DraftDetail(entity.id))
                                }
                            )
                        }
                    )
                    is Screen.DraftDetail -> {
                        val draft = drafts.find { it.id == targetScreen.draftId }
                        if (draft != null) {
                            DraftDetailScreen(
                                draft = draft,
                                onBack = { navigateBack() },
                                onStatusChange = { id, status -> viewModel.updateStatus(id, status) },
                                onDelete = { id ->
                                    viewModel.deleteDraft(id)
                                    navigateBack()
                                }
                            )
                        } else {
                            Box(modifier = Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
                                Text("Draft not found", fontWeight = FontWeight.Bold)
                            }
                        }
                    }
                    is Screen.History -> HistoryScreen(
                        drafts = drafts,
                        onDraftSelect = { id -> navigateTo(Screen.DraftDetail(id)) },
                        onStatusToggle = { id, currentStatus ->
                            val newStatus = if (currentStatus == "Completed") "Pending" else "Completed"
                            viewModel.updateStatus(id, newStatus)
                        },
                        onDelete = { id -> viewModel.deleteDraft(id) }
                    )
                }
            }
        }
    }
}

@Composable
fun DashboardScreen(
    drafts: List<DraftEntity>,
    onCategorySelect: (String) -> Unit,
    onHistoryClick: () -> Unit
) {
    val context = LocalContext.current
    val scrollState = rememberScrollState()

    // Calculate dynamic stats
    val today = SimpleDateFormat("dd-MM-yyyy", Locale.getDefault()).format(Date())
    val todayDrafts = drafts.filter {
        val draftDate = SimpleDateFormat("dd-MM-yyyy", Locale.getDefault()).format(Date(it.timestamp))
        draftDate == today
    }
    val completedCount = drafts.count { it.status == "Completed" }
    val pendingCount = drafts.count { it.status == "Pending" }
    val totalRevenueToday = todayDrafts.filter { it.status == "Completed" }.sumOf { it.price }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState)
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Welcome and Intro
        Column {
            Text(
                text = "Welcome, Balaji",
                fontSize = 28.sp,
                fontWeight = FontWeight.Bold,
                color = GovBlueDark,
                fontFamily = FontFamily.Serif
            )
            Text(
                text = "Manage government applications and digital tools from one portal.",
                fontSize = 14.sp,
                color = Color.Gray,
                modifier = Modifier.padding(top = 4.dp)
            )
        }

        // WhatsApp Notice Card
        Card(
            colors = CardDefaults.cardColors(containerColor = Color(0xFFE8F5E9)),
            border = BorderStroke(1.dp, Color(0xFF4CAF50)),
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Row(
                modifier = Modifier.padding(16.dp),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                Box(
                    modifier = Modifier
                        .size(40.dp)
                        .background(Color(0xFF2E7D32), CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Chat,
                        contentDescription = "Chat",
                        tint = Color.White,
                        modifier = Modifier.size(20.dp)
                    )
                }
                Column(modifier = Modifier.weight(1f)) {
                    Text(
                        text = "Customer Notice:",
                        fontWeight = FontWeight.Bold,
                        color = Color(0xFF1B5E20),
                        fontSize = 14.sp
                    )
                    Text(
                        text = "WhatsApp documents to us and get work done safely from home!",
                        fontSize = 12.sp,
                        color = Color(0xFF2E7D32)
                    )
                }
                Button(
                    onClick = {
                        val whatsappIntent = Intent(Intent.ACTION_VIEW).apply {
                            data = Uri.parse("https://api.whatsapp.com/send?phone=919000000000&text=Hi%20Balaji,%20I%20need%20help%20drafting%20some%20documents.")
                        }
                        try {
                            context.startActivity(whatsappIntent)
                        } catch (e: Exception) {
                            Toast.makeText(context, "WhatsApp not installed. Directing to web WhatsApp.", Toast.LENGTH_SHORT).show()
                        }
                    },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2E7D32)),
                    contentPadding = PaddingValues(horizontal = 12.dp, vertical = 6.dp),
                    shape = RoundedCornerShape(20.dp),
                    modifier = Modifier.testTag("whatsapp_message_button")
                ) {
                    Text("Message", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = Color.White)
                }
            }
        }

        // Category selections
        Text(
            text = "Select Category",
            fontSize = 18.sp,
            fontWeight = FontWeight.Bold,
            color = GovBlueDark,
            modifier = Modifier.padding(top = 8.dp)
        )

        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(12.dp)
        ) {
            // Category 1: Government & Portal
            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier
                    .weight(1f)
                    .height(180.dp)
                    .clickable { onCategorySelect("gov") }
                    .testTag("gov_services_category")
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.SpaceBetween
                ) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .background(Color(0xFFE3F2FD), RoundedCornerShape(10.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.AssuredWorkload,
                            contentDescription = "Gov",
                            tint = GovBlueMedium,
                            modifier = Modifier.size(24.dp)
                        )
                    }
                    Column {
                        Text(
                            text = "Government Services",
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp,
                            color = GovBlueDark,
                            lineHeight = 18.sp
                        )
                        Text(
                            text = "Aadhaar, PAN, Voter, Certificates.",
                            fontSize = 11.sp,
                            color = Color.Gray,
                            maxLines = 2,
                            overflow = TextOverflow.Ellipsis,
                            modifier = Modifier.padding(top = 2.dp)
                        )
                    }
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Text(
                            text = "15+ Services",
                            fontSize = 12.sp,
                            color = GovBlueMedium,
                            fontWeight = FontWeight.Bold
                        )
                        Icon(
                            imageVector = Icons.Default.ArrowForward,
                            contentDescription = "Forward",
                            tint = GovBlueMedium,
                            modifier = Modifier.size(12.dp)
                        )
                    }
                }
            }

            // Category 2: Digital Tools
            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
                shape = RoundedCornerShape(16.dp),
                modifier = Modifier
                    .weight(1f)
                    .height(180.dp)
                    .clickable { onCategorySelect("digital") }
                    .testTag("digital_tools_category")
            ) {
                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(16.dp),
                    verticalArrangement = Arrangement.SpaceBetween
                ) {
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .background(Color(0xFFE8F5E9), RoundedCornerShape(10.dp)),
                        contentAlignment = Alignment.Center
                    ) {
                        Icon(
                            imageVector = Icons.Default.Construction,
                            contentDescription = "Tools",
                            tint = ToolGreen,
                            modifier = Modifier.size(24.dp)
                        )
                    }
                    Column {
                        Text(
                            text = "Digital Tools & Career",
                            fontWeight = FontWeight.Bold,
                            fontSize = 14.sp,
                            color = GovBlueDark,
                            lineHeight = 18.sp
                        )
                        Text(
                            text = "Resumes, Biodata, Photos, AI Assistant.",
                            fontSize = 11.sp,
                            color = Color.Gray,
                            maxLines = 2,
                            overflow = TextOverflow.Ellipsis,
                            modifier = Modifier.padding(top = 2.dp)
                        )
                    }
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.spacedBy(4.dp)
                    ) {
                        Text(
                            text = "12+ Tools",
                            fontSize = 12.sp,
                            color = ToolGreen,
                            fontWeight = FontWeight.Bold
                        )
                        Icon(
                            imageVector = Icons.Default.ArrowForward,
                            contentDescription = "Forward",
                            tint = ToolGreen,
                            modifier = Modifier.size(12.dp)
                        )
                    }
                }
            }
        }

        // Live Revenue ledger status
        Card(
            colors = CardDefaults.cardColors(containerColor = GovBlueDark),
            shape = RoundedCornerShape(24.dp),
            modifier = Modifier
                .fillMaxWidth()
                .shadow(4.dp, RoundedCornerShape(24.dp))
                .clickable { onHistoryClick() }
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "TOTAL REVENUE TODAY",
                    fontSize = 10.sp,
                    color = AccentGold,
                    fontWeight = FontWeight.Bold,
                    letterSpacing = 1.sp
                )
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Text(
                        text = "₹${"%,.2f".format(totalRevenueToday)}",
                        fontSize = 32.sp,
                        fontWeight = FontWeight.Black,
                        color = Color.White
                    )
                    Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                        Box(
                            modifier = Modifier
                                .background(Color.White.copy(alpha = 0.1f), RoundedCornerShape(8.dp))
                                .padding(horizontal = 8.dp, vertical = 4.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Text("Pending", fontSize = 8.sp, color = Color.White.copy(alpha = 0.6f))
                                Text("$pendingCount", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color.White)
                            }
                        }
                        Box(
                            modifier = Modifier
                                .background(Color.White.copy(alpha = 0.1f), RoundedCornerShape(8.dp))
                                .padding(horizontal = 8.dp, vertical = 4.dp),
                            contentAlignment = Alignment.Center
                        ) {
                            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                                Text("Completed", fontSize = 8.sp, color = Color.White.copy(alpha = 0.6f))
                                Text("$completedCount", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color.White)
                            }
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun ServicesListScreen(
    category: String,
    onBack: () -> Unit,
    onServiceSelect: (String) -> Unit
) {
    var searchQuery by remember { mutableStateOf("") }
    val isGov = category == "gov"
    val title = if (isGov) "Government & Portal Services" else "Digital Tools & Career Services"
    val services = if (isGov) govServices else digitalTools

    // Filter services based on search query
    val filteredServices = services.filter {
        it.name.contains(searchQuery, ignoreCase = true)
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        // Back Button & Search Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            IconButton(
                onClick = onBack,
                modifier = Modifier
                    .background(Color.White, CircleShape)
                    .size(40.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.ArrowBack,
                    contentDescription = "Back",
                    tint = GovBlueDark
                )
            }
            Text(
                text = "Dashboard",
                fontSize = 14.sp,
                fontWeight = FontWeight.Bold,
                color = GovBlueDark,
                modifier = Modifier.clickable { onBack() }
            )
        }

        Spacer(modifier = Modifier.height(12.dp))

        Text(
            text = title,
            fontSize = 24.sp,
            fontWeight = FontWeight.Bold,
            color = GovBlueDark,
            fontFamily = FontFamily.Serif
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Search Input
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            placeholder = { Text("Search service...", fontSize = 14.sp) },
            leadingIcon = { Icon(Icons.Default.Search, contentDescription = "SearchIcon") },
            trailingIcon = {
                if (searchQuery.isNotEmpty()) {
                    IconButton(onClick = { searchQuery = "" }) {
                        Icon(Icons.Default.Close, contentDescription = "Clear")
                    }
                }
            },
            shape = RoundedCornerShape(24.dp),
            modifier = Modifier
                .fillMaxWidth()
                .testTag("service_search_input"),
            colors = OutlinedTextFieldDefaults.colors(
                unfocusedBorderColor = Color.LightGray,
                focusedBorderColor = GovBlueDark,
                unfocusedContainerColor = Color.White,
                focusedContainerColor = Color.White
            ),
            singleLine = true
        )

        Spacer(modifier = Modifier.height(16.dp))

        // Search result / List
        if (filteredServices.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        imageVector = Icons.Default.SearchOff,
                        contentDescription = "No results",
                        tint = Color.LightGray,
                        modifier = Modifier.size(64.dp)
                    )
                    Text(
                        text = "No services matched your search.",
                        color = Color.Gray,
                        fontSize = 14.sp,
                        modifier = Modifier.padding(top = 8.dp)
                    )
                }
            }
        } else {
            LazyColumn(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(filteredServices) { service ->
                    Card(
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onServiceSelect(service.name) }
                            .testTag("service_item_${service.name.replace(" ", "_")}")
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(16.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(16.dp),
                                modifier = Modifier.weight(1f)
                            ) {
                                Box(
                                    modifier = Modifier
                                        .size(40.dp)
                                        .background(
                                            if (isGov) Color(0xFFE3F2FD) else Color(0xFFE8F5E9),
                                            RoundedCornerShape(8.dp)
                                        ),
                                    contentAlignment = Alignment.Center
                                ) {
                                    Icon(
                                        imageVector = service.icon,
                                        contentDescription = service.name,
                                        tint = if (isGov) GovBlueMedium else ToolGreen,
                                        modifier = Modifier.size(20.dp)
                                    )
                                }
                                Text(
                                    text = service.name,
                                    fontWeight = FontWeight.Bold,
                                    fontSize = 14.sp,
                                    color = GovBlueDark,
                                    maxLines = 1,
                                    overflow = TextOverflow.Ellipsis
                                )
                            }
                            Icon(
                                imageVector = Icons.Default.ChevronRight,
                                contentDescription = "Go",
                                tint = Color.LightGray
                            )
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun DraftFormScreen(
    serviceName: String,
    isGenerating: Boolean,
    onBack: () -> Unit,
    onGenerate: (String, String, String) -> Unit
) {
    val context = LocalContext.current
    var customerName by remember { mutableStateOf("") }
    var languagePreference by remember { mutableStateOf("en") } // "en" or "kn"
    var specificRequest by remember { mutableStateOf("") }

    if (isGenerating) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(Color.White),
            contentAlignment = Alignment.Center
        ) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                CircularProgressIndicator(color = GovBlueDark, modifier = Modifier.size(48.dp))
                Text(
                    text = "Balaji Online Services",
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    color = GovBlueDark
                )
                Text(
                    text = "AI is drafting the document template...",
                    color = Color.Gray,
                    fontSize = 14.sp
                )
                Text(
                    text = "Applying correct professional standards",
                    color = AccentGold,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.Bold
                )
            }
        }
    } else {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(16.dp)
                .verticalScroll(rememberScrollState())
        ) {
            // Header with navigation back
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                IconButton(
                    onClick = onBack,
                    modifier = Modifier
                        .background(Color.White, CircleShape)
                        .size(40.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.ArrowBack,
                        contentDescription = "Back",
                        tint = GovBlueDark
                    )
                }
                Text(
                    text = "Cancel",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = GovBlueDark,
                    modifier = Modifier.clickable { onBack() }
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                elevation = CardDefaults.cardElevation(defaultElevation = 3.dp),
                shape = RoundedCornerShape(24.dp),
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(modifier = Modifier.padding(24.dp)) {
                    Text(
                        text = serviceName,
                        fontSize = 22.sp,
                        fontWeight = FontWeight.Bold,
                        color = GovBlueDark,
                        fontFamily = FontFamily.Serif
                    )
                    Text(
                        text = "Fill in customer details to generate the official document draft.",
                        fontSize = 12.sp,
                        color = Color.Gray,
                        modifier = Modifier.padding(top = 4.dp, bottom = 20.dp)
                    )

                    // Customer Name Field
                    Text(
                        text = "CUSTOMER FULL NAME",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.Gray,
                        letterSpacing = 1.sp
                    )
                    OutlinedTextField(
                        value = customerName,
                        onValueChange = { customerName = it },
                        placeholder = { Text("As per ID Card") },
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = 4.dp, bottom = 16.dp)
                            .testTag("customer_name_input"),
                        shape = RoundedCornerShape(12.dp),
                        singleLine = true
                    )

                    // Language Selector
                    Text(
                        text = "LANGUAGE PREFERENCE",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.Gray,
                        letterSpacing = 1.sp
                    )
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(top = 6.dp, bottom = 16.dp),
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        Card(
                            colors = CardDefaults.cardColors(
                                containerColor = if (languagePreference == "en") GovBlueDark else Color(0xFFF0F2F5)
                            ),
                            shape = RoundedCornerShape(12.dp),
                            modifier = Modifier
                                .weight(1f)
                                .clickable { languagePreference = "en" }
                                .testTag("lang_en_button")
                        ) {
                            Box(modifier = Modifier.padding(14.dp), contentAlignment = Alignment.Center) {
                                Text(
                                    "English (General)",
                                    color = if (languagePreference == "en") Color.White else GovBlueDark,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }

                        Card(
                            colors = CardDefaults.cardColors(
                                containerColor = if (languagePreference == "kn") GovBlueDark else Color(0xFFF0F2F5)
                            ),
                            shape = RoundedCornerShape(12.dp),
                            modifier = Modifier
                                .weight(1f)
                                .clickable { languagePreference = "kn" }
                                .testTag("lang_kn_button")
                        ) {
                            Box(modifier = Modifier.padding(14.dp), contentAlignment = Alignment.Center) {
                                Text(
                                    "Kannada (ಸರ್ಕಾರಿ)",
                                    color = if (languagePreference == "kn") Color.White else GovBlueDark,
                                    fontSize = 12.sp,
                                    fontWeight = FontWeight.Bold
                                )
                            }
                        }
                    }

                    // Specific request / reference details
                    Text(
                        text = "REFERENCE / SPECIFIC REQUEST",
                        fontSize = 10.sp,
                        fontWeight = FontWeight.Bold,
                        color = Color.Gray,
                        letterSpacing = 1.sp
                    )
                    OutlinedTextField(
                        value = specificRequest,
                        onValueChange = { specificRequest = it },
                        placeholder = { Text("Enter Aadhaar number, correction details, or specific application references...") },
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(110.dp)
                            .padding(top = 4.dp, bottom = 24.dp)
                            .testTag("specific_request_input"),
                        shape = RoundedCornerShape(12.dp),
                        maxLines = 4
                    )

                    // Action buttons
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.spacedBy(12.dp)
                    ) {
                        OutlinedButton(
                            onClick = onBack,
                            shape = RoundedCornerShape(12.dp),
                            modifier = Modifier.weight(1f),
                            contentPadding = PaddingValues(vertical = 14.dp)
                        ) {
                            Text("Cancel", color = Color.Gray, fontWeight = FontWeight.Bold)
                        }

                        Button(
                            onClick = {
                                if (customerName.trim().isEmpty()) {
                                    Toast.makeText(context, "Please enter customer name", Toast.LENGTH_SHORT).show()
                                } else {
                                    onGenerate(customerName, languagePreference, specificRequest)
                                }
                            },
                            shape = RoundedCornerShape(12.dp),
                            modifier = Modifier
                                .weight(1f)
                                .testTag("submit_form_button"),
                            colors = ButtonDefaults.buttonColors(containerColor = GovBlueDark),
                            contentPadding = PaddingValues(vertical = 14.dp)
                        ) {
                            Text("Generate Draft", fontWeight = FontWeight.Bold, color = Color.White)
                        }
                    }
                }
            }
        }
    }
}

@Composable
fun DraftDetailScreen(
    draft: DraftEntity,
    onBack: () -> Unit,
    onStatusChange: (Int, String) -> Unit,
    onDelete: (Int) -> Unit
) {
    val context = LocalContext.current
    var showDeleteDialog by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
            .verticalScroll(rememberScrollState())
    ) {
        // Navigation Header
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            Row(
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                IconButton(
                    onClick = onBack,
                    modifier = Modifier
                        .background(Color.White, CircleShape)
                        .size(40.dp)
                ) {
                    Icon(
                        imageVector = Icons.Default.ArrowBack,
                        contentDescription = "Back",
                        tint = GovBlueDark
                    )
                }
                Text(
                    text = "Close",
                    fontSize = 14.sp,
                    fontWeight = FontWeight.Bold,
                    color = GovBlueDark,
                    modifier = Modifier.clickable { onBack() }
                )
            }

            IconButton(
                onClick = { showDeleteDialog = true },
                modifier = Modifier
                    .background(Color(0xFFFEEBEE), CircleShape)
                    .size(36.dp)
            ) {
                Icon(
                    imageVector = Icons.Default.Delete,
                    contentDescription = "Delete Draft",
                    tint = Color.Red,
                    modifier = Modifier.size(18.dp)
                )
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Card Container
        Card(
            colors = CardDefaults.cardColors(containerColor = Color.White),
            elevation = CardDefaults.cardElevation(defaultElevation = 2.dp),
            shape = RoundedCornerShape(24.dp),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                // Header details
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween,
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .background(
                                if (draft.status == "Completed") Color(0xFFE8F5E9) else Color(0xFFFFF3E0),
                                RoundedCornerShape(6.dp)
                            )
                            .padding(horizontal = 8.dp, vertical = 4.dp)
                    ) {
                        Text(
                            text = draft.status.uppercase(),
                            color = if (draft.status == "Completed") Color(0xFF2E7D32) else Color(0xFFE65100),
                            fontSize = 10.sp,
                            fontWeight = FontWeight.Bold
                        )
                    }

                    Text(
                        text = "Price: ₹${draft.price.toInt()}",
                        fontWeight = FontWeight.Bold,
                        color = GovBlueMedium,
                        fontSize = 14.sp
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                Text(
                    text = draft.serviceName,
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    color = GovBlueDark,
                    fontFamily = FontFamily.Serif
                )

                Text(
                    text = "Customer: ${draft.customerName} | Lang: ${if (draft.languagePreference == "kn") "Kannada" else "English"}",
                    fontSize = 12.sp,
                    color = Color.Gray,
                    modifier = Modifier.padding(top = 2.dp)
                )

                Divider(modifier = Modifier.padding(vertical = 16.dp), color = Color(0xFFEEEEEE))

                // The Draft content itself
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color(0xFFF8F9FA), RoundedCornerShape(12.dp))
                        .border(1.dp, Color(0xFFE0E0E0), RoundedCornerShape(12.dp))
                        .padding(16.dp)
                ) {
                    Text(
                        text = draft.generatedDraft,
                        fontSize = 13.sp,
                        color = Color(0xFF333333),
                        lineHeight = 18.sp,
                        fontFamily = FontFamily.Monospace
                    )
                }

                Spacer(modifier = Modifier.height(20.dp))

                // Utility buttons: Copy, Share, WhatsApp Customer
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    Button(
                        onClick = {
                            val clipboard = context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
                            val clip = ClipData.newPlainText("Service Draft", draft.generatedDraft)
                            clipboard.setPrimaryClip(clip)
                            Toast.makeText(context, "Draft text copied!", Toast.LENGTH_SHORT).show()
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = GovBlueMedium),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier.weight(1f),
                        contentPadding = PaddingValues(vertical = 12.dp)
                    ) {
                        Icon(Icons.Default.ContentCopy, contentDescription = "Copy", modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("Copy", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color.White)
                    }

                    Button(
                        onClick = {
                            val shareIntent = Intent().apply {
                                action = Intent.ACTION_SEND
                                putExtra(Intent.EXTRA_TEXT, draft.generatedDraft)
                                type = "text/plain"
                            }
                            context.startActivity(Intent.createChooser(shareIntent, "Share Draft"))
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = GovBlueMedium),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier.weight(1f),
                        contentPadding = PaddingValues(vertical = 12.dp)
                    ) {
                        Icon(Icons.Default.Share, contentDescription = "Share", modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("Share", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = Color.White)
                    }

                    Button(
                        onClick = {
                            val sendIntent = Intent(Intent.ACTION_VIEW).apply {
                                data = Uri.parse("https://api.whatsapp.com/send?text=${Uri.encode(draft.generatedDraft)}")
                            }
                            try {
                                context.startActivity(sendIntent)
                            } catch (e: Exception) {
                                Toast.makeText(context, "WhatsApp is not available.", Toast.LENGTH_SHORT).show()
                            }
                        },
                        colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2E7D32)),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier.weight(1.2f),
                        contentPadding = PaddingValues(vertical = 12.dp)
                    ) {
                        Icon(Icons.Default.Chat, contentDescription = "WhatsApp", modifier = Modifier.size(16.dp))
                        Spacer(modifier = Modifier.width(4.dp))
                        Text("Send WhatsApp", fontSize = 11.sp, fontWeight = FontWeight.Bold, color = Color.White)
                    }
                }

                Spacer(modifier = Modifier.height(16.dp))

                // Toggle Status Button
                Button(
                    onClick = {
                        val newStatus = if (draft.status == "Completed") "Pending" else "Completed"
                        onStatusChange(draft.id, newStatus)
                    },
                    colors = ButtonDefaults.buttonColors(
                        containerColor = if (draft.status == "Completed") Color(0xFFFFF3E0) else Color(0xFFE8F5E9)
                    ),
                    shape = RoundedCornerShape(12.dp),
                    modifier = Modifier.fillMaxWidth(),
                    contentPadding = PaddingValues(vertical = 12.dp)
                ) {
                    Text(
                        text = if (draft.status == "Completed") "Mark as Pending" else "Mark as Completed",
                        color = if (draft.status == "Completed") Color(0xFFE65100) else Color(0xFF2E7D32),
                        fontWeight = FontWeight.Bold,
                        fontSize = 13.sp
                    )
                }
            }
        }
    }

    // Delete dialog confirmation
    if (showDeleteDialog) {
        AlertDialog(
            onDismissRequest = { showDeleteDialog = false },
            title = { Text("Delete Draft?", fontWeight = FontWeight.Bold) },
            text = { Text("This will permanently remove this customer's draft from the ledger database. This cannot be undone.") },
            confirmButton = {
                TextButton(
                    onClick = {
                        onDelete(draft.id)
                        showDeleteDialog = false
                    }
                ) {
                    Text("Delete", color = Color.Red, fontWeight = FontWeight.Bold)
                }
            },
            dismissButton = {
                TextButton(onClick = { showDeleteDialog = false }) {
                    Text("Cancel", color = Color.Gray)
                }
            }
        )
    }
}

@Composable
fun HistoryScreen(
    drafts: List<DraftEntity>,
    onDraftSelect: (Int) -> Unit,
    onStatusToggle: (Int, String) -> Unit,
    onDelete: (Int) -> Unit
) {
    var searchQuery by remember { mutableStateOf("") }
    var statusFilter by remember { mutableStateOf("All") } // "All", "Pending", "Completed"

    // Filter list
    val filteredDrafts = drafts.filter {
        val matchesSearch = it.customerName.contains(searchQuery, ignoreCase = true) ||
                it.serviceName.contains(searchQuery, ignoreCase = true)
        val matchesStatus = statusFilter == "All" || it.status == statusFilter
        matchesSearch && matchesStatus
    }

    // Calculating metrics
    val totalEarnings = drafts.filter { it.status == "Completed" }.sumOf { it.price }
    val pendingCount = drafts.count { it.status == "Pending" }
    val completedCount = drafts.count { it.status == "Completed" }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text(
            text = "Service History",
            fontSize = 26.sp,
            fontWeight = FontWeight.Bold,
            color = GovBlueDark,
            fontFamily = FontFamily.Serif
        )
        Text(
            text = "Track, search, and manage generated documents and bills.",
            fontSize = 12.sp,
            color = Color.Gray,
            modifier = Modifier.padding(top = 2.dp, bottom = 16.dp)
        )

        // Live financial metric cards
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            Card(
                colors = CardDefaults.cardColors(containerColor = GovBlueDark),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.weight(1.3f)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text("TOTAL EARNINGS", fontSize = 8.sp, color = AccentGold, fontWeight = FontWeight.Bold)
                    Text("₹${"%,.0f".format(totalEarnings)}", fontSize = 18.sp, fontWeight = FontWeight.Black, color = Color.White)
                }
            }

            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = BorderStroke(1.dp, Color(0xFFFFF3E0)),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.weight(1f)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text("PENDING", fontSize = 8.sp, color = Color.Gray, fontWeight = FontWeight.Bold)
                    Text("$pendingCount", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color(0xFFE65100))
                }
            }

            Card(
                colors = CardDefaults.cardColors(containerColor = Color.White),
                border = BorderStroke(1.dp, Color(0xFFE8F5E9)),
                shape = RoundedCornerShape(12.dp),
                modifier = Modifier.weight(1f)
            ) {
                Column(modifier = Modifier.padding(12.dp)) {
                    Text("COMPLETED", fontSize = 8.sp, color = Color.Gray, fontWeight = FontWeight.Bold)
                    Text("$completedCount", fontSize = 18.sp, fontWeight = FontWeight.Bold, color = Color(0xFF2E7D32))
                }
            }
        }

        Spacer(modifier = Modifier.height(16.dp))

        // Search Bar
        OutlinedTextField(
            value = searchQuery,
            onValueChange = { searchQuery = it },
            placeholder = { Text("Search customer or service...", fontSize = 13.sp) },
            leadingIcon = { Icon(Icons.Default.Search, contentDescription = "SearchIcon", modifier = Modifier.size(18.dp)) },
            singleLine = true,
            shape = RoundedCornerShape(16.dp),
            modifier = Modifier.fillMaxWidth(),
            colors = OutlinedTextFieldDefaults.colors(
                unfocusedBorderColor = Color.LightGray,
                focusedBorderColor = GovBlueDark,
                unfocusedContainerColor = Color.White,
                focusedContainerColor = Color.White
            )
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Status Filter Row
        Row(
            modifier = Modifier.fillMaxWidth(),
            horizontalArrangement = Arrangement.spacedBy(8.dp)
        ) {
            listOf("All", "Pending", "Completed").forEach { status ->
                val selected = statusFilter == status
                Box(
                    modifier = Modifier
                        .background(
                            if (selected) GovBlueDark else Color.White,
                            RoundedCornerShape(8.dp)
                        )
                        .border(1.dp, if (selected) GovBlueDark else Color.LightGray, RoundedCornerShape(8.dp))
                        .clickable { statusFilter = status }
                        .padding(horizontal = 14.dp, vertical = 6.dp)
                        .testTag("filter_status_$status")
                ) {
                    Text(
                        text = status,
                        fontSize = 11.sp,
                        fontWeight = FontWeight.Bold,
                        color = if (selected) Color.White else Color.Gray
                    )
                }
            }
        }

        Spacer(modifier = Modifier.height(12.dp))

        // Live draft list ledger
        if (filteredDrafts.isEmpty()) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f),
                contentAlignment = Alignment.Center
            ) {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Icon(
                        imageVector = Icons.Default.Inbox,
                        contentDescription = "Empty",
                        tint = Color.LightGray,
                        modifier = Modifier.size(48.dp)
                    )
                    Text("No records found", color = Color.Gray, fontSize = 13.sp)
                }
            }
        } else {
            LazyColumn(
                modifier = Modifier.weight(1f),
                verticalArrangement = Arrangement.spacedBy(8.dp)
            ) {
                items(filteredDrafts, key = { it.id }) { draft ->
                    val dateFormatted = SimpleDateFormat("dd MMM, hh:mm a", Locale.getDefault()).format(Date(draft.timestamp))

                    Card(
                        colors = CardDefaults.cardColors(containerColor = Color.White),
                        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
                        shape = RoundedCornerShape(12.dp),
                        modifier = Modifier
                            .fillMaxWidth()
                            .clickable { onDraftSelect(draft.id) }
                            .testTag("history_item_${draft.id}")
                    ) {
                        Row(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(12.dp),
                            verticalAlignment = Alignment.CenterVertically,
                            horizontalArrangement = Arrangement.SpaceBetween
                        ) {
                            Row(
                                modifier = Modifier.weight(1f),
                                horizontalArrangement = Arrangement.spacedBy(12.dp),
                                verticalAlignment = Alignment.CenterVertically
                            ) {
                                // Mini status indicator dot
                                Box(
                                    modifier = Modifier
                                        .size(10.dp)
                                        .background(
                                            if (draft.status == "Completed") Color(0xFF2E7D32) else Color(0xFFE65100),
                                            CircleShape
                                        )
                                )

                                Column {
                                    Text(
                                        text = draft.customerName,
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 14.sp,
                                        color = GovBlueDark
                                    )
                                    Text(
                                        text = draft.serviceName,
                                        fontSize = 11.sp,
                                        color = Color.Gray,
                                        maxLines = 1,
                                        overflow = TextOverflow.Ellipsis
                                    )
                                    Text(
                                        text = "$dateFormatted | Lang: ${draft.languagePreference.uppercase()}",
                                        fontSize = 9.sp,
                                        color = Color.LightGray
                                    )
                                }
                            }

                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(8.dp)
                            ) {
                                Column(horizontalAlignment = Alignment.End) {
                                    Text(
                                        text = "₹${draft.price.toInt()}",
                                        fontWeight = FontWeight.Bold,
                                        fontSize = 13.sp,
                                        color = GovBlueMedium
                                    )
                                    Text(
                                        text = draft.status,
                                        color = if (draft.status == "Completed") Color(0xFF2E7D32) else Color(0xFFE65100),
                                        fontSize = 9.sp,
                                        fontWeight = FontWeight.Bold,
                                        modifier = Modifier.clickable { onStatusToggle(draft.id, draft.status) }
                                    )
                                }

                                IconButton(
                                    onClick = { onDelete(draft.id) },
                                    modifier = Modifier.size(24.dp)
                                ) {
                                    Icon(
                                        imageVector = Icons.Default.Close,
                                        contentDescription = "Delete",
                                        tint = Color.LightGray,
                                        modifier = Modifier.size(16.dp)
                                    )
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
